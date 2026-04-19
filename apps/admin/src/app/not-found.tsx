import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-5 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Erreur 404</p>
            <h1 className="text-4xl font-black tracking-[-0.03em] text-slate-50 mb-4">
                Page introuvable
            </h1>
            <p className="text-sm text-slate-400 max-w-md mb-8">
                La page que vous cherchez n&apos;existe pas ou a été déplacée.
            </p>
            <Link
                href="/"
                className="rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand/90 transition-colors"
            >
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}
