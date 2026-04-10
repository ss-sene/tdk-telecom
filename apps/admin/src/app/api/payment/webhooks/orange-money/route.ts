// api/payment/webhooks/orange-money/route.ts
// IPN Orange Money — reçoit les notifications de paiement OM Web Payment
//
// Orange Money POST vers l'URL passée en `notif_url` lors de la création du paiement.
// L'URL est configurée dynamiquement : pas besoin de la déclarer dans un dashboard.
//
// Sécurité : on vérifie que order_id correspond à un Payment connu en base.
// Orange Money n'envoie pas de signature HMAC — la correspondance order_id est
// le seul mécanisme de vérification disponible avec cette API.

import { NextRequest, NextResponse } from 'next/server';
import { prisma }                    from '@/core/db/prisma';
import { PaymentStatus }             from '@/generated/prisma/client';
import type { OrangeMoneyWebhookPayload } from '@/core/services/orange-money.service';

// OM envoie inittxnstatus + confirmtxnstatus = '00' pour un succès
function resolveStatus(payload: OrangeMoneyWebhookPayload): PaymentStatus {
    if (
        payload.inittxnstatus   === '00' &&
        payload.confirmtxnstatus === '00'
    ) {
        return PaymentStatus.SUCCESS;
    }
    if (payload.status === 'FAILED' || payload.confirmtxnstatus !== '00') {
        return PaymentStatus.FAILED;
    }
    return PaymentStatus.PENDING;
}

export async function POST(req: NextRequest) {
    // Orange Money envoie en JSON
    let payload: OrangeMoneyWebhookPayload;
    try {
        payload = await req.json() as OrangeMoneyWebhookPayload;
    } catch {
        console.warn('[webhook/orange-money] Body JSON invalide');
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const internalRef = payload.order_id;
    const newStatus   = resolveStatus(payload);

    console.log(
        '[webhook/orange-money] ref:', internalRef,
        '| txnid:', payload.txnid,
        '| status:', newStatus
    );

    if (!internalRef) {
        console.warn('[webhook/orange-money] order_id manquant dans le payload');
        return NextResponse.json({ received: true });
    }

    try {
        const updated = await prisma.payment.updateMany({
            where: {
                internalRef,
                // Guard : on ne régresse jamais un paiement déjà finalisé
                status: { notIn: [PaymentStatus.SUCCESS, PaymentStatus.REFUNDED] },
            },
            data: {
                status:   newStatus,
                // Stocker l'ID de transaction OM si disponible
                ...(payload.txnid && { providerRef: payload.txnid }),
                ...(newStatus === PaymentStatus.FAILED && {
                    errorMessage: `Orange Money: ${payload.confirmtxnmessage ?? payload.status}`,
                }),
            },
        });

        if (updated.count === 0) {
            console.warn('[webhook/orange-money] Paiement introuvable ou déjà finalisé — ref:', internalRef);
        } else {
            console.log(`[webhook/orange-money] ✅ Payment ${internalRef} → ${newStatus}`);
        }

        return NextResponse.json({ received: true });

    } catch (err) {
        console.error('[webhook/orange-money] DB error:', err);
        return NextResponse.json({ received: true });
    }
}
