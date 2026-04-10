// apps/admin/src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { TDK_PLANS_ARRAY } from '@tdk/config';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white font-[var(--font-inter),Inter,sans-serif]">

            {/* HEADER */}
            <header className="border-b border-gray-100 bg-white px-6 py-4">
                <div className="mx-auto flex max-w-5xl items-center gap-2">
                    <div className="relative h-8 w-8">
                        <Image
                            src="/logo.png"
                            alt="TDK Telecom"
                            fill
                            className="object-contain"
                            priority
                            sizes="32px"
                        />
                    </div>
                    <span className="text-lg font-black tracking-tight text-[#1A3C9F]">TDK Telecom</span>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">

                {/* HERO */}
                <div className="text-center mb-16">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1A3C9F] mb-3">Abonnement Internet</p>
                    <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
                        Choisissez votre connexion
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                        Internet haut débit pour votre foyer. Payez en toute simplicité via Wave ou Orange Money.
                    </p>
                </div>

                {/* CARDS OFFRES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {TDK_PLANS_ARRAY.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col rounded-2xl p-8 ring-2 transition-all ${
                                plan.isPopular
                                    ? 'ring-[#1A3C9F] bg-white shadow-xl shadow-[#1A3C9F]/10'
                                    : 'ring-gray-200 bg-white shadow-sm'
                            }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#1A3C9F] px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                                    Le plus populaire
                                </div>
                            )}

                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                                <p className="mt-1 text-sm font-semibold text-[#1A3C9F]">{plan.speed}</p>

                                <div className="mt-5 flex items-baseline gap-1.5">
                                    <span className="text-4xl font-black text-gray-900">
                                        {plan.price.toLocaleString('fr-FR')}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-500">FCFA / mois</span>
                                </div>

                                <ul className="mt-6 space-y-2.5">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <svg className="h-4 w-4 flex-none text-[#2ECA50]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                href={`/checkout?plan=${encodeURIComponent(plan.name)}`}
                                className={`mt-8 flex h-12 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                                    plan.isPopular
                                        ? 'bg-[#1A3C9F] text-white hover:bg-[#142E7B] shadow-md shadow-[#1A3C9F]/20'
                                        : 'border-2 border-[#1A3C9F] text-[#1A3C9F] hover:bg-[#1A3C9F] hover:text-white'
                                }`}
                            >
                                Souscrire maintenant
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Trust bar */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Paiement sécurisé
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Activation rapide
                    </span>
                    <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Support local
                    </span>
                </div>
            </main>
        </div>
    );
}
