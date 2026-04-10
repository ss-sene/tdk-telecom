// api/payment/webhooks/wave/route.ts
// IPN Wave — reçoit les notifications de paiement Wave Checkout
//
// ⚠️  Configurer cette URL dans le dashboard Wave Business :
//      Settings → Webhooks → https://{domaine}/api/payment/webhooks/wave
//
// Sécurité : Wave signe le body avec HMAC-SHA256 (WAVE_WEBHOOK_SECRET)
// Header reçu : Authorization: Wave {timestamp}.{signature}

import { NextRequest, NextResponse } from 'next/server';
import { prisma }                    from '@/core/db/prisma';
import { PaymentStatus }             from '@/generated/prisma/client';
import { verifyWaveWebhookSignature } from '@/core/services/wave.service';
import type { WaveWebhookPayload }   from '@/core/services/wave.service';

// --- MAPPING statut Wave → PaymentStatus Prisma ---
const STATUS_MAP: Record<string, PaymentStatus> = {
    succeeded:  PaymentStatus.SUCCESS,
    processing: PaymentStatus.PENDING,
    cancelled:  PaymentStatus.FAILED,
};

export async function POST(req: NextRequest) {
    const rawBody = await req.text();

    // --- Vérification de la signature ---
    const authHeader = req.headers.get('authorization') ?? '';
    if (!authHeader || !verifyWaveWebhookSignature(authHeader, rawBody)) {
        console.warn('[webhook/wave] Signature invalide — rejetée');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // --- Parsing du payload ---
    let payload: WaveWebhookPayload;
    try {
        payload = JSON.parse(rawBody) as WaveWebhookPayload;
    } catch {
        console.warn('[webhook/wave] Body JSON invalide');
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    // On ne traite que l'événement de complétion de session
    if (payload.type !== 'checkout.session.completed') {
        return NextResponse.json({ received: true });
    }

    const { client_reference: internalRef, payment_status, id: sessionId } = payload.data;

    console.log('[webhook/wave] event:', payload.type, '| ref:', internalRef, '| status:', payment_status);

    const newStatus = STATUS_MAP[payment_status] ?? PaymentStatus.PENDING;

    try {
        const updated = await prisma.payment.updateMany({
            where: {
                internalRef,
                // Guard : on ne régresse jamais un paiement déjà finalisé
                status: { notIn: [PaymentStatus.SUCCESS, PaymentStatus.REFUNDED] },
            },
            data: {
                status:      newStatus,
                providerRef: sessionId,
                ...(newStatus === PaymentStatus.FAILED && {
                    errorMessage: `Wave: ${payment_status}`,
                }),
            },
        });

        if (updated.count === 0) {
            console.warn('[webhook/wave] Paiement introuvable ou déjà finalisé — ref:', internalRef);
        } else {
            console.log(`[webhook/wave] ✅ Payment ${internalRef} → ${newStatus}`);
        }

        return NextResponse.json({ received: true });

    } catch (err) {
        console.error('[webhook/wave] DB error:', err);
        // 200 pour éviter les retries Wave sur une erreur DB transitoire
        return NextResponse.json({ received: true });
    }
}
