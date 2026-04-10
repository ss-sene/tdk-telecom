'use client';

// Composant invisible — interroge le serveur toutes les 3s quand le paiement est PENDING.
// router.refresh() re-exécute le Server Component parent avec des données DB fraîches.
// S'arrête dès que le statut change ou après 10 minutes (sécurité anti-boucle).

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INTERVAL_MS  = 3_000;   // 3 secondes entre chaque vérification
const MAX_ATTEMPTS = 200;      // ~10 minutes maximum

export function PendingPoller({ internalRef }: { internalRef: string }) {
    const router = useRouter();

    useEffect(() => {
        let attempts = 0;

        const timer = setInterval(() => {
            attempts++;
            router.refresh();
            if (attempts >= MAX_ATTEMPTS) {
                clearInterval(timer);
                console.warn('[PendingPoller] Timeout atteint pour', internalRef);
            }
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, [internalRef, router]);

    return null;
}
