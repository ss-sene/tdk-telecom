// apps/admin/src/app/page.tsx
import Link  from 'next/link';
import Image from 'next/image';
import { TDK_PLANS_ARRAY } from '@tdk/config';
import { LandingMobileNav } from './LandingMobileNav';

const POPULAR = TDK_PLANS_ARRAY.find(p => p.isPopular) ?? TDK_PLANS_ARRAY[1];

const MINI_CARDS = [
    { title: 'Deux forfaits lisibles',  desc: "Standard ou Premium. Un seul critère : l'usage que vous en faites." },
    { title: 'Formulaire en 3 minutes', desc: 'Votre nom, votre numéro, votre zone. Rien de plus.' },
    { title: 'Wave & Orange Money',     desc: 'Paiement direct depuis votre application mobile, sans redirection complexe.' },
    { title: 'Activation sous 24 h',    desc: 'Votre demande est traitée et votre connexion activée rapidement.' },
];

const AVANTAGES = [
    {
        title: 'Connexion sans interruption',
        desc:  "Votre internet fonctionne de jour comme de nuit, sept jours sur sept — sans plages horaires, sans limitation d'usage.",
        path:  'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
        title: 'Une équipe implantée localement',
        desc:  "Nos techniciens connaissent votre zone. Vous êtes suivi par des personnes sur le terrain, pas par un centre d'appels distant.",
        path:  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
        title: 'Un prix affiché, aucune surprise',
        desc:  "10 000 ou 12 000 FCFA par mois. Le montant est connu avant de payer. Pas de frais d'activation, pas de dépassement.",
        path:  'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        title: 'Souscription depuis votre téléphone',
        desc:  'Remplissez le formulaire en 3 minutes et payez depuis Wave ou Orange Money. Pas de déplacement, pas de paperasse.',
        path:  'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
];

const STEPS = [
    {
        num:   '01',
        title: 'Choisissez votre forfait',
        desc:  'Standard à 10 000 FCFA ou Premium à 12 000 FCFA par mois. Comparez les débits et les usages pour choisir ce qui vous convient.',
        cta:   'Voir les forfaits' as string | null,
        href:  '#offres'           as string | null,
    },
    {
        num:   '02',
        title: 'Remplissez le formulaire',
        desc:  "Indiquez votre prénom, votre numéro de téléphone et votre zone. Si votre localité n'est pas dans la liste, précisez-la — notre équipe revient vers vous.",
        cta:   null as string | null,
        href:  null as string | null,
    },
    {
        num:   '03',
        title: 'Payez depuis votre mobile',
        desc:  "Confirmez le paiement directement depuis votre application Wave ou Orange Money. Votre demande est enregistrée instantanément. L'installation est planifiée sous 24 h.",
        cta:   null as string | null,
        href:  null as string | null,
    },
];

const FAQ = [
    {
        q: 'Dans quelles zones êtes-vous disponibles ?',
        a: "TDK Telecom couvre plusieurs villages et quartiers au Sénégal. Lors de la souscription, vous sélectionnez votre localité dans notre liste. Si votre zone n'y figure pas, indiquez-la dans le formulaire — notre équipe vous recontacte sous 24 heures pour confirmer la faisabilité.",
    },
    {
        q: 'Comment fonctionne le paiement ?',
        a: "Après avoir rempli le formulaire de souscription, vous êtes redirigé vers votre application Wave ou Orange Money. Le montant est affiché à l'avance, sans frais cachés. La validation se fait en quelques secondes depuis votre téléphone.",
    },
    {
        q: 'Que se passe-t-il après la souscription ?',
        a: "Votre demande est enregistrée immédiatement. L'équipe TDK Telecom vous contacte dans les 24 heures pour planifier l'installation et activer votre connexion.",
    },
    {
        q: 'Puis-je changer de forfait plus tard ?',
        a: 'Oui. Contactez notre support par WhatsApp ou par téléphone pour adapter votre abonnement à vos besoins. Le changement est effectif dès le mois suivant, sans frais supplémentaires.',
    },
];

const TRUST_ITEMS = [
    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',        label: 'Paiement sécurisé' },
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',         label: 'Activation sous 24 h' },
    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Support local' },
    { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',       label: 'Aucun frais caché' },
];

function CheckIcon() {
    return (
        <svg className="h-4 w-4 flex-none text-success" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">

            {/* ── NAV ── */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">

                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="relative h-9 w-9">
                            <Image src="/logo.png" alt="TDK Telecom" fill className="object-contain" priority sizes="36px" />
                        </div>
                        <span className="text-base font-black tracking-tight text-brand">TDK Telecom</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
                        <Link href="#offres"            className="hover:text-brand transition-colors">Offres</Link>
                        <Link href="#comment-ca-marche" className="hover:text-brand transition-colors">Comment ça marche</Link>
                        <Link href="#faq"               className="hover:text-brand transition-colors">FAQ</Link>
                    </nav>

                    <LandingMobileNav />
                </div>
            </header>

            <main>

                {/* ── HERO ── */}
                <section className="bg-white px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">

                            {/* Texte gauche */}
                            <div>
                                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-xs font-bold text-brand">
                                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                                    Disponible au Sénégal &bull; Installation accompagnée &bull; Paiement mobile
                                </div>

                                <h1 className="text-[clamp(36px,6.5vw,60px)] font-black leading-[0.97] tracking-[-0.04em] text-gray-900 mb-5">
                                    Un internet fiable.<br />
                                    Deux offres claires.<br />
                                    <span className="text-brand">Payez depuis votre téléphone.</span>
                                </h1>

                                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-[52ch]">
                                    TDK Telecom vous propose une connexion haut débit au Sénégal, avec deux forfaits
                                    lisibles, une souscription rapide et un paiement simple via Wave ou Orange Money.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-7">
                                    <Link
                                        href="#offres"
                                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-7 text-sm font-bold text-white hover:bg-brand-hover transition-colors shadow-[0_4px_14px_rgba(26,60,159,0.25)]"
                                    >
                                        Voir les forfaits
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        className="inline-flex h-12 items-center rounded-xl border border-gray-200 bg-white px-7 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Souscrire maintenant
                                    </Link>
                                </div>

                                <div className="flex flex-wrap gap-5 text-sm text-gray-500">
                                    {['Souscription en 3 minutes', 'Wave & Orange Money', 'Installation comprise'].map(label => (
                                        <span key={label} className="flex items-center gap-1.5">
                                            <CheckIcon />
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Hero card droite */}
                            <div className="rounded-2xl bg-card ring-1 ring-gray-200 p-5 shadow-sm">
                                <div className="rounded-xl bg-gray-900 p-5 text-white mb-4">
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Forfait le plus choisi</p>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-black tracking-[-0.04em]">
                                            {POPULAR.price.toLocaleString('fr-FR')}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-400">FCFA / mois</span>
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                                        Connexion stable pour la maison, le travail et le streaming.
                                    </p>
                                    <Link
                                        href={`/checkout?plan=${encodeURIComponent(POPULAR.name)}`}
                                        className="flex h-10 w-full items-center justify-center rounded-xl bg-brand text-xs font-bold text-white hover:bg-brand-hover transition-colors"
                                    >
                                        Souscrire à ce forfait
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {MINI_CARDS.map(card => (
                                        <div key={card.title} className="rounded-xl bg-white ring-1 ring-gray-100 p-4">
                                            <h3 className="text-sm font-bold text-gray-900 mb-1">{card.title}</h3>
                                            <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── AVANTAGES ── */}
                <section id="avantages" className="bg-card px-5 py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Pourquoi TDK ?</p>
                            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-[-0.03em]">
                                Ce qui nous distingue
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {AVANTAGES.map(a => (
                                <div key={a.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light">
                                        <svg className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={a.path} />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1.5">{a.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OFFRES ── */}
                <section id="offres" className="bg-white px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-6xl">

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Tarifs simples</p>
                                <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-[-0.03em]">
                                    Deux forfaits, un choix simple
                                </h2>
                            </div>
                            <p className="text-sm text-gray-500 max-w-[42ch]">
                                {"Pas d'offres complexes, pas de jargon. Choisissez en fonction de votre usage, payez chaque mois."}
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
                            {TDK_PLANS_ARRAY.map(plan => (
                                <article
                                    key={plan.id}
                                    className={`relative flex flex-col rounded-2xl p-7 ring-2 transition-all ${
                                        plan.isPopular
                                            ? 'ring-brand bg-white shadow-xl shadow-brand/10'
                                            : 'ring-gray-200 bg-white shadow-sm'
                                    }`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-xs font-bold text-white">
                                            Le plus choisi
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mb-4 ${
                                            plan.isPopular ? 'bg-brand-light text-brand' : 'bg-card text-gray-600'
                                        }`}>
                                            {plan.isPopular ? 'Streaming & travail' : 'Usage quotidien'}
                                        </span>
                                        <div className="flex items-baseline gap-1.5 mb-1">
                                            <span className="text-4xl font-black tracking-[-0.04em] text-gray-900">
                                                {plan.price.toLocaleString('fr-FR')}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-500">FCFA / mois</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-5">Sans engagement &bull; Activation sous 24 h</p>
                                        <ul className="space-y-2.5 mb-6">
                                            {plan.features.map(feat => (
                                                <li key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
                                                    <CheckIcon />
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <Link
                                        href={`/checkout?plan=${encodeURIComponent(plan.name)}`}
                                        className={`flex h-12 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                                            plan.isPopular
                                                ? 'bg-brand text-white hover:bg-brand-hover shadow-md shadow-brand/20'
                                                : 'border-2 border-brand text-brand hover:bg-brand hover:text-white'
                                        }`}
                                    >
                                        Souscrire à cette offre
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {/* Trust bar */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                            {TRUST_ITEMS.map(({ icon, label }) => (
                                <span key={label} className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                    {label}
                                </span>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ── COMMENT ÇA MARCHE ── */}
                <section id="comment-ca-marche" className="bg-card px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-14">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Processus</p>
                            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-[-0.03em]">
                                Comment ça marche
                            </h2>
                            <p className="mt-3 text-base text-gray-500 max-w-[46ch] mx-auto">
                                De la sélection du forfait au paiement mobile, tout se fait en 3 étapes depuis votre téléphone.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                            {/* Connecteur horizontal desktop */}
                            <div className="hidden md:block absolute top-[52px] left-[calc(33.33%+20px)] right-[calc(33.33%+20px)] h-px bg-gray-200 z-0" />

                            {STEPS.map(step => (
                                <div key={step.num} className="relative z-10 flex flex-col items-start rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-sm font-black text-white shrink-0">
                                        {step.num}
                                    </div>
                                    <h3 className="text-base font-extrabold text-gray-900 mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{step.desc}</p>
                                    {step.cta && step.href && (
                                        <Link
                                            href={step.href}
                                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-hover transition-colors"
                                        >
                                            {step.cta}
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section id="faq" className="bg-white px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-3xl">
                        <div className="text-center mb-12">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Questions fréquentes</p>
                            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl tracking-[-0.03em]">
                                Tout ce que vous devez savoir
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {FAQ.map(item => (
                                <details key={item.q} className="group rounded-2xl bg-card ring-1 ring-gray-100 px-6 py-5 cursor-pointer">
                                    <summary className="flex items-center justify-between gap-4 font-bold text-gray-900 list-none [&::-webkit-details-marker]:hidden">
                                        <span>{item.q}</span>
                                        <svg
                                            className="h-5 w-5 flex-none text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-180"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <p className="mt-4 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CTA FINALE ── */}
                <section className="px-5 py-20 sm:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-2xl bg-brand px-8 py-14 sm:px-14 text-white text-center shadow-xl shadow-brand/20">
                            <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">Prêt à vous connecter ?</p>
                            <h2 className="text-3xl font-black sm:text-4xl tracking-[-0.03em] mb-4 max-w-[22ch] mx-auto">
                                {"Souscrivez dès aujourd'hui depuis votre téléphone."}
                            </h2>
                            <p className="text-base text-blue-200 mb-9 max-w-[48ch] mx-auto leading-relaxed">
                                Choisissez votre forfait, remplissez le formulaire en 3 minutes et payez
                                directement depuis Wave ou Orange Money. Simple, clair, sécurisé.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/checkout"
                                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-8 text-sm font-bold text-brand hover:bg-blue-50 transition-colors shadow-lg"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    Commencer la souscription
                                </Link>
                                <Link
                                    href="#offres"
                                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                                >
                                    Voir les forfaits
                                </Link>
                            </div>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200">
                                {['Paiement 100% sécurisé', 'Wave & Orange Money acceptés', 'Aucun frais caché'].map(label => (
                                    <span key={label} className="flex items-center gap-1.5">
                                        <CheckIcon />
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* ── FOOTER ── */}
            <footer className="border-t border-gray-100 bg-card px-5 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="relative h-8 w-8">
                                    <Image src="/logo.png" alt="TDK Telecom" fill className="object-contain" sizes="32px" />
                                </div>
                                <span className="font-black text-brand">TDK Telecom</span>
                            </div>
                            <p className="text-sm text-gray-500 max-w-xs">
                                {"Fournisseur d'accès Internet au Sénégal. Connexion haut débit pour particuliers et entreprises."}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-16 gap-y-2.5 text-sm">
                            <Link href="#offres"            className="text-gray-500 hover:text-brand transition-colors">Offres</Link>
                            <Link href="#avantages"         className="text-gray-500 hover:text-brand transition-colors">Avantages</Link>
                            <Link href="#comment-ca-marche" className="text-gray-500 hover:text-brand transition-colors">Comment ça marche</Link>
                            <Link href="#faq"               className="text-gray-500 hover:text-brand transition-colors">FAQ</Link>
                            <Link href="/checkout"          className="text-gray-500 hover:text-brand transition-colors">{"S'abonner"}</Link>
                            <a href="mailto:contact@tdktelecom.sn" className="text-gray-500 hover:text-brand transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
                        <p>© {new Date().getFullYear()} TDK Telecom. Tous droits réservés.</p>
                        <p>{"Dakar, Sénégal — Internet simple, fiable et pensé pour votre zone."}</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
