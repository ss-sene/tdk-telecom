// core/services/wave.service.ts
// Wave Pay Link marchand — aucune clé API requise
//
// Flow :
// 1. Générer https://pay.wave.com/m/{WAVE_MERCHANT_ID}?amount={montant}
// 2. Rediriger le client vers ce lien → ouvre l'app Wave (mobile) ou Wave web (desktop)
// 3. Le client paie → revient sur la page de succès
// 4. L'admin confirme le paiement via le dashboard (ou via webhook Wave API si activé plus tard)
//
// Env var requise :
//   WAVE_MERCHANT_ID — alias de ta boutique Wave (ex: "tdk-telecom")
//                      Visible dans l'app Wave Business ou ton profil marchand
//
// Pour le webhook automatique (optionnel, nécessite un compte Wave Business avec API) :
//   WAVE_WEBHOOK_SECRET — secret de signature (à activer plus tard si besoin)

import { createHmac, timingSafeEqual } from 'crypto';

// --- TYPES ---

export interface CreateWavePayLinkParams {
    amount:      number;   // en XOF (entier)
    internalRef: string;   // référence interne pour traçabilité
}

export type CreateWavePayLinkResult =
    | { success: true;  payUrl: string; sessionId: string }
    | { success: false; message: string };

// --- GÉNÉRER LE LIEN MARCHAND WAVE ---

export function createWavePayLink(
    params: CreateWavePayLinkParams
): CreateWavePayLinkResult {
    const merchantId = process.env.WAVE_MERCHANT_ID;

    if (!merchantId) {
        return { success: false, message: 'WAVE_MERCHANT_ID non configuré' };
    }

    const url = new URL(`https://pay.wave.com/m/${merchantId}`);
    url.searchParams.set('amount', String(params.amount));

    return {
        success:   true,
        payUrl:    url.toString(),
        sessionId: params.internalRef,  // On utilise notre ref comme identifiant de session
    };
}

// --- VÉRIFICATION DE SIGNATURE WEBHOOK (optionnel — Wave API Business) ---
// Utilisé si tu actives les webhooks Wave plus tard.
// Wave envoie : Authorization: Wave {timestamp}.{hmac_signature}
// hmac_signature = HMAC-SHA256(WAVE_WEBHOOK_SECRET, `${timestamp}.${rawBody}`)

export function verifyWaveWebhookSignature(
    authHeader: string,
    rawBody:    string
): boolean {
    try {
        const token     = authHeader.replace(/^Wave\s+/i, '');
        const dotIdx    = token.indexOf('.');
        const timestamp = token.slice(0, dotIdx);
        const signature = token.slice(dotIdx + 1);

        const expected = createHmac('sha256', process.env.WAVE_WEBHOOK_SECRET!)
            .update(`${timestamp}.${rawBody}`)
            .digest('hex');

        return timingSafeEqual(
            Buffer.from(signature, 'hex'),
            Buffer.from(expected,  'hex')
        );
    } catch {
        return false;
    }
}

// --- TYPE DU PAYLOAD WEBHOOK WAVE (optionnel) ---

export interface WaveWebhookPayload {
    type: string;
    data: {
        id:               string;
        client_reference: string;
        payment_status:   'succeeded' | 'cancelled' | 'processing';
        amount:           string;
        currency:         string;
    };
}
