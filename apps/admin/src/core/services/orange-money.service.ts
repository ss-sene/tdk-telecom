// core/services/orange-money.service.ts
// Orange Money Sénégal — Web Payment API
//
// Flow :
// 1. POST {OM_BASE_URL}/token (OAuth2 client_credentials) → access_token
// 2. POST {OM_BASE_URL}/webpayment → payment_url (page OM) + notif_token
// 3. Rediriger le client vers payment_url
// 4. Orange Money POST webhook vers notif_url avec le statut de la transaction
//
// Env vars requises :
//   OM_BASE_URL       — ex: https://api.orange.com/orange-money-webpay/sn/v1
//   OM_CLIENT_ID      — App consumer key (Orange Developer Portal)
//   OM_CLIENT_SECRET  — App consumer secret
//   OM_MERCHANT_KEY   — Clé marchande Orange Money

// --- TYPES ---

export interface CreateOrangeMoneyPaymentParams {
    amount:       number;   // en XOF (entier)
    internalRef:  string;   // order_id — notre référence interne
    notifUrl:     string;   // URL webhook OM (notif_url)
    returnUrl:    string;   // Redirection après paiement réussi
    cancelUrl:    string;   // Redirection après annulation
}

export type CreateOrangeMoneyPaymentResult =
    | { success: true;  paymentUrl: string; notifToken: string }
    | { success: false; message: string };

// --- HELPER : Obtenir le token OAuth2 ---

async function getAccessToken(): Promise<string> {
    const credentials = Buffer.from(
        `${process.env.OM_CLIENT_ID!}:${process.env.OM_CLIENT_SECRET!}`
    ).toString('base64');

    const res = await fetch(`${process.env.OM_BASE_URL!}/token`, {
        method:  'POST',
        headers: {
            'Content-Type':  'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
        },
        body:   'grant_type=client_credentials',
        signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
        throw new Error(`OM token error ${res.status}: ${await res.text()}`);
    }

    const data = await res.json();
    return data.access_token as string;
}

// --- CRÉER LE PAIEMENT ---

export async function createOrangeMoneyPayment(
    params: CreateOrangeMoneyPaymentParams
): Promise<CreateOrangeMoneyPaymentResult> {
    try {
        const accessToken = await getAccessToken();

        const body = {
            merchant_key: process.env.OM_MERCHANT_KEY!,
            currency:     'OUV',          // Code devise OM Sénégal
            order_id:     params.internalRef,
            amount:       params.amount,
            return_url:   params.returnUrl,
            cancel_url:   params.cancelUrl,
            notif_url:    params.notifUrl,
            lang:         'fr',
        };

        const res = await fetch(`${process.env.OM_BASE_URL!}/webpayment`, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-AUTH-KEY':    process.env.OM_MERCHANT_KEY!,
            },
            body:   JSON.stringify(body),
            signal: AbortSignal.timeout(15_000),
        });

        const data = await res.json();
        console.log('[orange-money] createPayment →', JSON.stringify(data));

        if (!res.ok || !data.payment_url) {
            return {
                success: false,
                message: data?.message ?? `Orange Money API error ${res.status}`,
            };
        }

        return {
            success:    true,
            paymentUrl: data.payment_url  as string,
            notifToken: data.notif_token  as string,
        };
    } catch (err) {
        console.error('[orange-money] createPayment error:', err);
        return { success: false, message: 'Erreur réseau Orange Money' };
    }
}

// --- TYPES DU PAYLOAD WEBHOOK ---
// Orange Money POST vers notif_url avec ces champs

export interface OrangeMoneyWebhookPayload {
    status:              string;   // 'SUCCESS' | 'FAILED' | ...
    txnid:               string;
    txnmode:             string;
    inittxnmessage:      string;
    inittxnstatus:       string;   // '00' = succès
    confirmtxnstatus:    string;   // '00' = succès
    confirmtxnmessage:   string;
    amount:              number;
    sendermsisdn:        string;   // Numéro du payeur
    notif_token:         string;   // Correspond à notifToken de la création
    order_id:            string;   // Notre internalRef
}
