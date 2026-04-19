'use client';

import { useEffect } from 'react';
import { COMPANY } from '@/lib/company';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[app/error]', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-5 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Erreur</p>
            <h1 className="text-4xl font-black tracking-[-0.03em] text-slate-50 mb-4">
                Une erreur est survenue
            </h1>
            <p className="text-sm text-slate-400 max-w-md mb-8">
                Veuillez réessayer. Si le problème persiste, contactez-nous à{' '}
                <a href={`mailto:${COMPANY.email}`} className="text-brand hover:underline">
                    {COMPANY.email}
                </a>.
                {error.digest && (
                    <span className="block mt-2 text-xs text-slate-600">Référence : {error.digest}</span>
                )}
            </p>
            <button
                onClick={reset}
                className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand/90 transition-colors"
            >
                Réessayer
            </button>
        </div>
    );
}
