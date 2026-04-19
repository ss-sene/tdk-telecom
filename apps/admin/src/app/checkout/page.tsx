// app/checkout/page.tsx
import type { Metadata }     from 'next';
import { prisma }            from '@/core/db/prisma';

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};
import Image                 from 'next/image';
import Link                  from 'next/link';
import { CheckoutFormClient } from './CheckoutFormClient';
import { COMPANY }           from '@/lib/company';

export const dynamic = 'force-dynamic';

export default async function CheckoutGateway() {
    const rawVillages = await prisma.village.findMany({
        orderBy: { titre: 'asc' },
        select: { id: true, titre: true }
    });

    const villages = rawVillages.map(v => ({
        id: v.id,
        titre: v.titre ?? 'Sans nom',
    }));

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 font-sans text-slate-100">

            {/* Header simplifié — confiance, pas de distraction */}
            <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
                <div className="mx-auto flex max-w-5xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/logo.png"
                                alt={COMPANY.shortName}
                                fill
                                className="object-contain"
                                priority
                                sizes="32px"
                            />
                        </div>
                        <span className="text-base font-extrabold tracking-tight text-brand">{COMPANY.shortName}</span>
                    </Link>

                    {/* Badge sécurité */}
                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Paiement 100% sécurisé
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full px-4 py-8 sm:py-12">
                <div className="mx-auto max-w-5xl">
                    <CheckoutFormClient villages={villages} />
                </div>
            </main>

            <footer className="border-t border-slate-800 py-4 px-6">
                <p className="text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} {COMPANY.name} · Toutes les transactions sont chiffrées et sécurisées
                </p>
            </footer>
        </div>
    );
}
