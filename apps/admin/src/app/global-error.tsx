'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[global-error]', error);
    }, [error]);

    return (
        <html lang="fr" className="dark">
            <body className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-5 text-center antialiased">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Erreur critique</p>
                <h1 className="text-4xl font-black text-white mb-4">
                    Quelque chose s&apos;est mal passé
                </h1>
                <p className="text-sm text-slate-400 max-w-md mb-8">
                    Une erreur inattendue a été rencontrée. Notre équipe a été notifiée.
                    {error.digest && (
                        <span className="block mt-2 text-xs text-slate-600">Référence : {error.digest}</span>
                    )}
                </p>
                <button
                    onClick={reset}
                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-colors"
                >
                    Réessayer
                </button>
            </body>
        </html>
    );
}
