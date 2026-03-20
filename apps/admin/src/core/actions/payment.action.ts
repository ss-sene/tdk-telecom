// apps/admin/src/core/actions/payment.action.ts
'use server';

import { prisma } from '@/core/db/prisma';
import { InitiatePaymentSchema } from '@/core/validators/payment.schema';
import { SoftPayProvider, processPayment } from '@/core/services/softpay.service';

// --- CATALOGUE (Source de vérité anti-tampering) ---
// Le montant est résolu ici côté serveur, jamais depuis le client
const PRICING_CATALOG: Record<string, number> = {
    'Pack Standard': 10000,
    'Pack Premium':  12000,
};

export async function initiatePayment(payload: unknown) {
    // --- 1. Validation ---
    const parsedData = InitiatePaymentSchema.safeParse(payload);
    if (!parsedData.success) {
        console.error('[VALIDATION_ERROR]', parsedData.error.flatten());
        return { success: false, error: 'Données invalides. Veuillez vérifier le formulaire.' };
    }

    const dto = parsedData.data;

    // --- Résolution du prix côté serveur (anti-tampering) ---
    // dto.amount vient du client mais on le valide contre le catalogue
    // Si le montant ne correspond à aucune offre connue → rejet
    const knownPrices = Object.values(PRICING_CATALOG);
    const actualPrice = knownPrices.includes(dto.amount) ? dto.amount : null;
    if (!actualPrice) {
        return { success: false, error: 'Offre sélectionnée invalide ou expirée.' };
    }

    const cleanEmail = dto.email && dto.email.trim() !== '' ? dto.email.trim() : null;

    try {
        // --- 2. Résolution du village ---
        let finalVillageId = dto.villageId;

        if (dto.villageId === 'OTHER' && dto.newVillageName) {
            const cleanName = dto.newVillageName.trim().charAt(0).toUpperCase()
                + dto.newVillageName.trim().slice(1).toLowerCase();

            const village = await prisma.village.upsert({
                where:  { titre: cleanName },   // ✅ titre (pas name)
                update: {},
                create: { titre: cleanName },
            });

            finalVillageId = village.id;
        }

        // --- 3. Upsert Client ---
        const client = await prisma.client.upsert({
            where:  { phone: dto.phone },
            update: {
                firstName: dto.firstName,
                lastName:  dto.lastName,
                villageId: finalVillageId,
                email:     cleanEmail,
            },
            create: {
                phone:     dto.phone,
                firstName: dto.firstName,
                lastName:  dto.lastName,
                villageId: finalVillageId,
                email:     cleanEmail,
            },
        });

        // --- 4. Créer le Payment en PENDING ---
        const payment = await prisma.payment.create({
            data: {
                amount:   actualPrice,
                provider: dto.provider,
                clientId: client.id,
            },
        });

        // --- 5. Appeler SoftPay ---
        const softPayProvider = dto.provider as SoftPayProvider;

        const result = await processPayment({
            provider:      softPayProvider,
            amount:        actualPrice,
            phone:         dto.phone,
            customerName:  `${dto.firstName} ${dto.lastName}`,
            customerEmail: cleanEmail || 'client@tdk-telecom.sn',
            internalRef:   payment.internalRef,
            callbackUrl:   `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
            returnUrl:     `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?ref=${payment.internalRef}`,
            cancelUrl:     `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancelled=1`,
        });

        if (!result.success) {
            await prisma.payment.update({
                where: { id: payment.id },
                data:  { status: 'FAILED', errorMessage: result.message },
            });
            return { success: false, error: result.message };
        }

        // --- 6. Retourner les URLs selon le provider ---
        // Wave        → redirectUrl (deeplink pay.wave.com)
        // Orange Money mobile → redirectUrl (om_url deeplink)
        // Orange Money desktop → pas de redirectUrl, on retourne qrUrl
        if (result.provider === 'WAVE') {
            return {
                success:     true,
                provider:    'WAVE',
                redirectUrl: result.redirectUrl,
                internalRef: payment.internalRef,
                fees:        result.fees,
            };
        }

        // Orange Money
        return {
            success:     true,
            provider:    'ORANGE_MONEY',
            redirectUrl: result.redirectUrl,  // om_url (mobile)
            qrUrl:       result.qrUrl,         // QR page (desktop)
            maxitUrl:    result.maxitUrl,
            internalRef: payment.internalRef,
            fees:        result.fees,
        };

    } catch (error) {
        console.error('[PAYMENT_INIT_ERROR]', error);
        return { success: false, error: "Erreur de communication avec l'opérateur financier." };
    }
}