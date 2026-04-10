// src/hooks/usePayment.ts
'use client';

import { useState } from 'react';
import { initiatePayment } from '@/core/actions/payment.action';
import type { InitiatePaymentDto } from '@/core/validators/payment.schema';

export type { InitiatePaymentDto };

// State machine :
// idle → loading → redirecting (vers app Wave ou page Orange Money)
//                → error
export type PaymentState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'redirecting'; provider: 'WAVE' | 'ORANGE_MONEY' }
    | { status: 'error'; message: string };

export function usePayment() {
    const [state, setState] = useState<PaymentState>({ status: 'idle' });

    async function startPayment(data: InitiatePaymentDto) {
        setState({ status: 'loading' });

        try {
            const result = await initiatePayment(data);

            if (!result.success) {
                setState({ status: 'error', message: result.error ?? 'Erreur inconnue' });
                return;
            }

            // result.success est true ici — les champs sont garantis présents
            if (!result.checkoutUrl || !result.provider) {
                setState({ status: 'error', message: 'Réponse invalide du serveur.' });
                return;
            }

            setState({ status: 'redirecting', provider: result.provider });

            // Redirection immédiate vers l'app Wave ou la page Orange Money
            window.location.href = result.checkoutUrl;

        } catch {
            setState({ status: 'error', message: 'Erreur réseau. Vérifiez votre connexion et réessayez.' });
        }
    }

    function reset() {
        setState({ status: 'idle' });
    }

    return { state, startPayment, reset };
}
