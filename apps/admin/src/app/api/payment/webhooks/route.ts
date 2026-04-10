// api/payment/webhooks/route.ts
// Ce endpoint n'est plus utilisé depuis la migration vers Wave/Orange Money directs.
// Les webhooks sont maintenant gérés par :
//   POST /api/payment/webhooks/wave          — Wave Checkout IPN
//   POST /api/payment/webhooks/orange-money  — Orange Money Web Payment IPN

import { NextResponse } from 'next/server';

export async function POST() {
    return NextResponse.json(
        { error: 'Endpoint déprécié. Utiliser /api/payment/webhooks/wave ou /api/payment/webhooks/orange-money' },
        { status: 410 }
    );
}
