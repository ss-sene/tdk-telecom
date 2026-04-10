'use client';

import { useState } from 'react';
import { usePayment } from '@/hooks/usePayment';
import { InitiatePaymentSchema } from '@/core/validators/payment.schema';
import type { PaymentProvider } from '@/core/validators/payment.schema';

interface Village {
    id:    string;
    titre: string;
}

interface Props {
    villages: Village[];
}

const PLANS = [
    { id: 'Pack Standard', label: 'Pack Standard', price: 10000, speed: 'Jusqu\'à 15 Mbps' },
    { id: 'Pack Premium',  label: 'Pack Premium',  price: 12000, speed: 'Jusqu\'à 30 Mbps' },
];

const PROVIDERS: { id: PaymentProvider; label: string; logo: string }[] = [
    {
        id:    'WAVE',
        label: 'Wave',
        logo:  '〜',
    },
    {
        id:    'ORANGE_MONEY',
        label: 'Orange Money',
        logo:  '◉',
    },
];

const PROVIDER_MESSAGES: Record<PaymentProvider, string> = {
    WAVE:         'Vous allez être redirigé vers l\'application Wave pour confirmer le paiement.',
    ORANGE_MONEY: 'Vous allez être redirigé vers la page de paiement Orange Money.',
};

function InputField({
    id, label, error, children, hint,
}: {
    id: string; label: string; error?: string; children: React.ReactNode; hint?: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-500">
                {label} {hint && <span className="font-normal normal-case tracking-normal text-gray-400">{hint}</span>}
            </label>
            {children}
            {error && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{error}</p>}
        </div>
    );
}

export function CheckoutFormClient({ villages }: Props) {
    const { state, startPayment, reset } = usePayment();

    const [firstName,      setFirstName]     = useState('');
    const [lastName,       setLastName]      = useState('');
    const [email,          setEmail]         = useState('');
    const [phone,          setPhone]         = useState('');
    const [villageId,      setVillageId]     = useState('');
    const [newVillageName, setNewVillageName] = useState('');
    const [plan,           setPlan]          = useState(PLANS[0].id);
    const [provider,       setProvider]      = useState<PaymentProvider>('WAVE');
    const [errors,         setErrors]        = useState<Record<string, string>>({});

    const selectedPlan = PLANS.find(p => p.id === plan) ?? PLANS[0];

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({});

        const payload = {
            firstName,
            lastName,
            email:          email || undefined,
            phone,
            villageId:      villageId || '',
            newVillageName: villageId === 'OTHER' ? newVillageName : undefined,
            amount:         selectedPlan.price,
            provider,
        };

        const parsed = InitiatePaymentSchema.safeParse(payload);
        if (!parsed.success) {
            const fieldErrors: Record<string, string> = {};
            for (const issue of parsed.error.issues) {
                const key = issue.path[0] as string;
                if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
            }
            setErrors(fieldErrors);
            return;
        }

        startPayment(parsed.data);
    }

    // ── État : Redirection ─────────────────────────────────────
    if (state.status === 'redirecting') {
        const providerLabel = PROVIDERS.find(p => p.id === state.provider)?.label ?? state.provider;
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
                <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-[#1A3C9F] border-t-transparent" />
                <div className="text-center">
                    <p className="text-lg font-extrabold text-gray-900">Redirection vers {providerLabel}…</p>
                    <p className="mt-1.5 text-sm text-gray-500 max-w-xs mx-auto">{PROVIDER_MESSAGES[state.provider]}</p>
                </div>
            </div>
        );
    }

    // ── État : Erreur ──────────────────────────────────────────
    if (state.status === 'error') {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100">
                    <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-1.5">Une erreur est survenue</h2>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">{state.message}</p>
                </div>
                <button
                    onClick={reset}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1A3C9F] px-8 text-sm font-bold text-white hover:bg-[#142E7B] transition-colors"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    // ── Formulaire ─────────────────────────────────────────────
    return (
        <div className="mx-auto max-w-5xl">

            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Souscrire à Internet TDK</h1>
                <p className="mt-1 text-sm text-gray-500">Remplissez le formulaire ci-dessous pour finaliser votre abonnement.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">

                {/* ── COLONNE GAUCHE : Formulaire ── */}
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5 order-2 lg:order-1">

                    {/* Identité */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputField id="firstName" label="Prénom" error={errors.firstName}>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                placeholder="Mamadou"
                                className="block h-11 w-full rounded-xl border-0 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                            />
                        </InputField>
                        <InputField id="lastName" label="Nom" error={errors.lastName}>
                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Diallo"
                                className="block h-11 w-full rounded-xl border-0 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                            />
                        </InputField>
                    </div>

                    {/* Téléphone */}
                    <InputField id="phone" label="Numéro de téléphone" error={errors.phone}>
                        <div className="flex">
                            <span className="inline-flex h-11 items-center rounded-l-xl bg-gray-50 px-3 text-sm font-bold text-gray-500 ring-1 ring-inset ring-gray-200">
                                +221
                            </span>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                                placeholder="77 123 45 67"
                                className="block h-11 w-full rounded-r-xl border-0 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                            />
                        </div>
                    </InputField>

                    {/* Email */}
                    <InputField id="email" label="Email" hint="(facultatif)" error={errors.email}>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="mamadou@example.com"
                            className="block h-11 w-full rounded-xl border-0 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                        />
                    </InputField>

                    {/* Zone */}
                    <InputField id="villageId" label="Zone de couverture" error={errors.villageId}>
                        <select
                            id="villageId"
                            value={villageId}
                            onChange={e => setVillageId(e.target.value)}
                            className="block h-11 w-full rounded-xl border-0 bg-white px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                        >
                            <option value="">Sélectionner une zone…</option>
                            {villages.map(v => (
                                <option key={v.id} value={v.id}>{v.titre}</option>
                            ))}
                            <option value="OTHER">Autre zone…</option>
                        </select>
                    </InputField>

                    {villageId === 'OTHER' && (
                        <InputField id="newVillageName" label="Nom de votre zone" error={errors.newVillageName}>
                            <input
                                id="newVillageName"
                                type="text"
                                value={newVillageName}
                                onChange={e => setNewVillageName(e.target.value)}
                                placeholder="Ex: Quartier Liberté 6"
                                className="block h-11 w-full rounded-xl border-0 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-[#1A3C9F] outline-none"
                            />
                        </InputField>
                    )}

                    {/* Moyen de paiement */}
                    <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Moyen de paiement</p>
                        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Moyen de paiement">
                            {PROVIDERS.map(p => {
                                const isSelected = provider === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        role="radio"
                                        aria-checked={isSelected}
                                        onClick={() => setProvider(p.id)}
                                        className={`flex items-center justify-center gap-2 h-12 rounded-xl border-2 font-bold text-sm transition-all ${
                                            isSelected
                                                ? 'border-[#1A3C9F] bg-blue-50 text-[#1A3C9F]'
                                                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                                        }`}
                                    >
                                        {isSelected && (
                                            <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.provider && <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">{errors.provider}</p>}
                    </div>

                    {/* CTA */}
                    <button
                        type="submit"
                        disabled={state.status === 'loading'}
                        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1A3C9F] text-sm font-bold text-white shadow-lg shadow-[#1A3C9F]/20 transition-colors hover:bg-[#142E7B] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {state.status === 'loading' ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Traitement en cours…
                            </>
                        ) : (
                            <>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Payer {selectedPlan.price.toLocaleString('fr-FR')} FCFA via {PROVIDERS.find(p => p.id === provider)?.label}
                            </>
                        )}
                    </button>

                    {/* Trust line */}
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Transaction sécurisée
                        </span>
                        <span className="text-gray-200">|</span>
                        <span>TDK Telecom</span>
                    </div>
                </form>

                {/* ── COLONNE DROITE : Récapitulatif ── */}
                <div className="space-y-4 order-1 lg:order-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">Votre offre</h2>

                    {PLANS.map(p => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setPlan(p.id)}
                            className={`w-full text-left rounded-2xl border-2 p-5 transition-all ${
                                plan === p.id
                                    ? 'border-[#1A3C9F] bg-blue-50/60'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`font-extrabold text-sm ${plan === p.id ? 'text-[#1A3C9F]' : 'text-gray-900'}`}>
                                        {p.label}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{p.speed}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-extrabold text-base text-gray-900">
                                        {p.price.toLocaleString('fr-FR')} <span className="text-xs font-bold">FCFA</span>
                                    </p>
                                    <p className="text-xs text-gray-400">/ mois</p>
                                </div>
                            </div>
                            {plan === p.id && (
                                <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-[#1A3C9F]">
                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Sélectionné
                                </div>
                            )}
                        </button>
                    ))}

                    {/* Récapitulatif */}
                    <div className="rounded-2xl bg-[#F9FAFB] p-5 ring-1 ring-gray-200">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Récapitulatif</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Offre</span>
                                <span className="font-bold text-gray-900">{selectedPlan.label}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Débit</span>
                                <span className="font-bold text-gray-900">{selectedPlan.speed}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Via</span>
                                <span className="font-bold text-gray-900">{PROVIDERS.find(p => p.id === provider)?.label}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2.5 mt-1 flex justify-between items-baseline">
                                <span className="text-gray-500 font-semibold">Total</span>
                                <span className="font-extrabold text-xl text-gray-900">{selectedPlan.price.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Trust badges dans la sidebar */}
                    <div className="rounded-2xl bg-[#F9FAFB] px-5 py-4 ring-1 ring-gray-200 space-y-2.5">
                        <div className="flex items-center gap-2.5 text-xs text-gray-600">
                            <svg className="h-4 w-4 flex-none text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            <span>Paiement 100% sécurisé</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-600">
                            <svg className="h-4 w-4 flex-none text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Aucun frais caché</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-600">
                            <svg className="h-4 w-4 flex-none text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Support local disponible</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
