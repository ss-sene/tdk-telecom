// src/core/actions/payment.action.ts
'use server';

import { prisma } from '@/core/db/prisma';
import { InitiatePaymentSchema } from "@/core/validators/payment.schema";

const PRICING_CATALOG: Record<string, number> = {
    'Pack Standard': 10000,
    'Pack Premium': 12000,
};

export async function initiatePayment(payload: unknown) {
    const parsedData = InitiatePaymentSchema.safeParse(payload);

    if (!parsedData.success) {
        console.error("Validation Error:", parsedData.error.flatten());
        return { success: false, error: "Données invalides. Veuillez vérifier le nom de la zone." };
    }

    const dto = parsedData.data;
    const internalRef = `TDK-${Date.now()}`.toUpperCase();
    const planEncoded = encodeURIComponent(dto.plan);

    const actualPrice = PRICING_CATALOG[dto.plan];
    if (!actualPrice) return { success: false, error: "Offre invalide." };

    const cleanEmail = dto.email && dto.email.trim() !== '' ? dto.email.trim() : null;

    try {
        // --- 1. RÉSOLUTION DYNAMIQUE DU VILLAGE ---
        let finalVillageId = dto.villageId;

        if (dto.villageId === 'OTHER' && dto.newVillageName) {
            // Nettoyage de base (Majuscule initiale) pour limiter les doublons visuels
            const cleanVillageName = dto.newVillageName.trim().charAt(0).toUpperCase() + dto.newVillageName.trim().slice(1).toLowerCase();
            
            // Création ou récupération si un autre client a déjà tapé ce nom exact
            const village = await prisma.village.upsert({
                where: { titre: cleanVillageName },
                update: {}, // Ne rien faire s'il existe déjà
                create: { 
                    titre: cleanVillageName, 
                    // Optionnel: vous pourriez ajouter isActive: false ici si vous souhaitez valider manuellement les nouvelles zones
                }
            });
            finalVillageId = village.id; // On récupère le véritable UUID généré par la BDD
        }

        // --- 2. UPSERT DU CLIENT ---
        const client = await prisma.client.upsert({
            where: { phone: dto.phone },
            update: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                villageId: finalVillageId, // Utilisation de l'UUID résolu
                email: cleanEmail,
            },
            create: {
                phone: dto.phone,
                firstName: dto.firstName,
                lastName: dto.lastName,
                villageId: finalVillageId, // Utilisation de l'UUID résolu
                email: cleanEmail,
            },
        });

        // --- 3. CRÉATION DU PAIEMENT ---
        await prisma.payment.create({
            data: {
                amount: actualPrice,
                provider: dto.provider,
                internalRef,
                clientId: client.id,
            },
        });

        return {
            success: true,
            redirectUrl: `/checkout/success?ref=${internalRef}&plan=${planEncoded}`
        };

    } catch (error) {
        console.error("[PAYMENT_INIT_ERROR]", error);
        return { success: false, error: "Erreur interne lors de l'initialisation." };
    }
}