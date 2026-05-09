// apps/admin/src/app/page.tsx
import type { Metadata }   from 'next';
import Link                from 'next/link';
import { TDK_PLANS_ARRAY } from '@tdk/config';
import { COMPANY }         from '@/lib/company';
import { PublicHeader }    from './PublicHeader';
import { PublicFooter }    from './PublicFooter';
import { HomeHero }        from './HomeHero';
import { ScrollLink }      from '@/components/ui/ScrollLink';


export const metadata: Metadata = {
    title:       'Internet Haut Débit au Sénégal — Forfaits dès 10 000 FCFA/mois',
    description: 'TDK Telecom — Internet haut débit au Sénégal dès 10 000 FCFA/mois. Installation accompagnée, activation sous 24h, paiement Wave ou Orange Money. Couverture nationale.',
    alternates:  { canonical: '/' },
    openGraph: {
        title:       'Internet Haut Débit au Sénégal — TDK Telecom',
        description: 'Forfaits Internet 10 000 ou 12 000 FCFA/mois. Installation par techniciens locaux. Paiement Wave & Orange Money. Activation sous 24h.',
        url:         '/',
        images: [{ url: '/og-image.png', width: 1424, height: 752, alt: 'TDK Telecom — Internet au Sénégal' }],
    },
};

const AVANTAGES = [
    {
        title: 'Connexion stable pour vos usages essentiels',
        desc:  "Que ce soit pour regarder des vidéos, travailler, discuter sur WhatsApp ou suivre des formations, votre connexion reste disponible selon votre forfait.",
        path:  'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
        title: 'Un accompagnement humain, du début à la fin',
        desc:  "Chez TDK Telecom, vous n'êtes pas seul. Une équipe locale vous guide avant, pendant et après l'installation.",
        path:  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
        title: 'Des offres claires, sans confusion',
        desc:  "Vous choisissez entre deux forfaits simples. Vous savez ce que vous payez, à l'avance.",
        path:  'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        title: 'Paiement facile depuis votre téléphone',
        desc:  'Réglez votre abonnement en quelques secondes avec Wave ou Orange Money. Aucun déplacement nécessaire.',
        path:  'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
];

const STEPS = [
    {
        num:   '01',
        title: 'Choisissez votre forfait',
        desc:  'Standard ou Premium, selon votre besoin et votre budget.',
        cta:   'Voir les forfaits' as string | null,
        href:  '#offres'           as string | null,
    },
    {
        num:   '02',
        title: 'Remplissez votre demande',
        desc:  "Indiquez votre numéro et votre localité. Même si votre zone n'est pas listée, vous pouvez la préciser.",
        cta:   null as string | null,
        href:  null as string | null,
    },
    {
        num:   '03',
        title: 'Payez depuis votre téléphone',
        desc:  'Validez le paiement via Wave ou Orange Money.',
        cta:   null as string | null,
        href:  null as string | null,
    },
    {
        num:   '04',
        title: 'Installation par notre équipe',
        desc:  "Un technicien vous contacte pour planifier l'installation et activer votre connexion.",
        cta:   null as string | null,
        href:  null as string | null,
    },
];

type FaqItem = { q: string; a: string; aNode?: React.ReactNode };

const FAQ: FaqItem[] = [
    {
        q: 'Est-ce que votre service est disponible dans ma zone ?',
        a: "Nous couvrons 14 régions du Sénégal. Si votre localité n'apparaît pas, contactez-nous et nous vérifions pour vous.",
        aNode: (
            <>
                Nous couvrons 14 régions du Sénégal. Si votre localité n&apos;apparaît pas,{' '}
                <Link href="/zones-couvertes" className="text-brand font-semibold hover:underline">
                    consultez la liste des zones couvertes
                </Link>
                {' '}ou contactez-nous et nous vérifions pour vous.
            </>
        ),
    },
    {
        q: 'Comment je paie mon abonnement ?',
        a: "Vous payez directement depuis votre téléphone avec Wave ou Orange Money.",
    },
    {
        q: 'Que se passe-t-il après le paiement ?',
        a: "Notre équipe vous contacte pour organiser l'installation et activer votre connexion.",
    },
    {
        q: 'Est-ce que je peux changer de forfait ?',
        a: 'Oui, il suffit de contacter le support pour adapter votre offre.',
        aNode: (
            <>
                Oui, il suffit de contacter le support par{' '}
                <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brand font-semibold hover:underline">
                    WhatsApp
                </a>
                {' '}ou par{' '}
                <a href={`tel:${COMPANY.phone}`} className="text-brand font-semibold hover:underline">
                    téléphone
                </a>
                {' '}pour adapter votre offre.
            </>
        ),
    },
    {
        q: 'Et si je suis en zone rurale ?',
        a: "Nous proposons Starlink, une solution Internet par satellite disponible partout au Sénégal.",
        aNode: (
            <>
                Nous proposons{' '}
                <Link href="/starlink" className="text-brand font-semibold hover:underline">
                    Starlink
                </Link>
                , une solution Internet par satellite disponible partout au Sénégal, même sans fibre ou réseau stable.
            </>
        ),
    },
];

const FAQ_JSON_LD = {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: FAQ.map(item => ({
        '@type': 'Question',
        name:    item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tdk-telecom.com';

const SERVICES_JSON_LD = {
    '@context':  'https://schema.org',
    '@type':     'ItemList',
    'name':      'Forfaits Internet TDK Telecom',
    'itemListElement': [
        {
            '@type':    'ListItem',
            'position': 1,
            'item': {
                '@type':       'Service',
                '@id':         `${APP_URL}/#pack-standard`,
                'name':        'Pack Standard Internet',
                'description': "Connexion Internet haut débit jusqu'à 15 Mbps. Idéal pour la navigation quotidienne et les réseaux sociaux.",
                'provider':    { '@id': `${APP_URL}/#organization` },
                'areaServed':  { '@type': 'Country', 'name': 'Sénégal' },
                'offers': {
                    '@type':         'Offer',
                    'price':         '10000',
                    'priceCurrency': 'XOF',
                    'priceSpecification': {
                        '@type':            'UnitPriceSpecification',
                        'price':            10000,
                        'priceCurrency':    'XOF',
                        'unitText':         'month',
                        'billingIncrement': 1,
                    },
                    'eligibleRegion': { '@type': 'Country', 'name': 'Sénégal' },
                },
            },
        },
        {
            '@type':    'ListItem',
            'position': 2,
            'item': {
                '@type':       'Service',
                '@id':         `${APP_URL}/#pack-premium`,
                'name':        'Pack Premium Internet',
                'description': "Connexion Internet haut débit jusqu'à 30 Mbps. Pour le streaming, le télétravail et plusieurs appareils simultanés.",
                'provider':    { '@id': `${APP_URL}/#organization` },
                'areaServed':  { '@type': 'Country', 'name': 'Sénégal' },
                'offers': {
                    '@type':         'Offer',
                    'price':         '12000',
                    'priceCurrency': 'XOF',
                    'priceSpecification': {
                        '@type':            'UnitPriceSpecification',
                        'price':            12000,
                        'priceCurrency':    'XOF',
                        'unitText':         'month',
                        'billingIncrement': 1,
                    },
                    'eligibleRegion': { '@type': 'Country', 'name': 'Sénégal' },
                },
            },
        },
    ],
};

const TRUST_ITEMS = [
    { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',       label: 'Aucun frais caché' },
    { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',         label: 'Prix connu à l\'avance' },
    { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',        label: 'Paiement sécurisé' },
    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Assistance locale disponible' },
];

function CheckIcon() {
    return (
        <svg className="h-4 w-4 flex-none text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );
}

export default function HomePage() {
    return (
        <div className="min-h-screen bg-surface-page">

            {/* ── NAV ── */}
            <PublicHeader />

            <main>

                {/* ── HERO ── */}
                <HomeHero />

                {/* ── AVANTAGES ── */}
                <section id="avantages" className="bg-surface-section px-5 py-20 sm:py-24">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-14">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Pourquoi TDK Telecom ?</p>
                            <h2 className="text-3xl font-bold text-text-base sm:text-4xl tracking-[-0.02em] mb-3">
                                Une solution simple, pensée pour votre quotidien
                            </h2>
                            <p className="text-base text-text-secondary max-w-[44ch] mx-auto">
                                Pas de jargon, pas de complications. Juste ce dont vous avez besoin.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {AVANTAGES.map(a => (
                                <div key={a.title} className="rounded-2xl bg-surface-card p-6 border border-border-subtle">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light ring-1 ring-brand/10">
                                        <svg className="h-5 w-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={a.path} />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-text-base mb-2">{a.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">{a.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── OFFRES ── */}
                <section id="offres" className="bg-surface-page px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-6xl">

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Nos forfaits</p>
                                <h2 className="text-3xl font-bold text-text-base sm:text-4xl tracking-[-0.02em]">
                                    Nos forfaits Internet
                                </h2>
                            </div>
                            <p className="text-sm text-text-secondary max-w-[42ch]">
                                {"Deux options claires. Vous choisissez selon votre usage, vous payez depuis votre téléphone."}
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                            {TDK_PLANS_ARRAY.map(plan => (
                                <article
                                    key={plan.id}
                                    className={`relative flex flex-col rounded-2xl p-7 border-2 transition-all ${
                                        plan.isPopular
                                            ? 'border-brand/70 bg-surface-raised'
                                            : 'border-border-subtle bg-surface-card'
                                    }`}
                                >
                                    {plan.isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand border border-brand/30 px-4 py-1 text-xs font-medium text-[#121A26]">
                                            Le plus choisi
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold mb-4 ${
                                            plan.isPopular
                                                ? 'bg-brand-light text-brand'
                                                : 'bg-surface-section text-text-secondary border border-border-subtle'
                                        }`}>
                                            {plan.isPopular ? 'Streaming & travail' : 'Usage quotidien'}
                                        </span>
                                        <div className="flex items-baseline gap-1.5 mb-1">
                                            <span className="text-4xl font-extrabold tracking-[-0.03em] text-text-base">
                                                {plan.price.toLocaleString('fr-FR')}
                                            </span>
                                            <span className="text-sm font-semibold text-text-muted">FCFA / mois</span>
                                        </div>
                                        <p className="text-xs text-text-faint mb-5">Sans engagement &bull; Activation sous 24 h</p>
                                        <ul className="space-y-2.5 mb-6">
                                            {plan.features.map(feat => (
                                                <li key={feat} className="flex items-center gap-2.5 text-sm text-text-secondary">
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
                                                ? 'bg-brand text-[#121A26] hover:bg-brand-hover'
                                                : 'border-2 border-brand/60 text-brand hover:bg-brand/10 hover:border-brand transition-colors'
                                        }`}
                                    >
                                        Choisir ce forfait
                                    </Link>
                                </article>
                            ))}
                        </div>

                        {/* Trust bar */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-text-faint">
                            {TRUST_ITEMS.map(({ icon, label }) => (
                                <span key={label} className="flex items-center gap-2">
                                    <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                                    </svg>
                                    {label}
                                </span>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ── COMMENT ÇA MARCHE ── */}
                <section id="comment-ca-marche" className="bg-surface-section px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-6xl">
                        <div className="text-center mb-14">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Processus</p>
                            <h2 className="text-3xl font-bold text-text-base sm:text-4xl tracking-[-0.02em]">
                                Comment ça marche ?
                            </h2>
                            <p className="mt-3 text-base text-text-secondary max-w-[46ch] mx-auto">
                                En 4 étapes simples, depuis votre téléphone, en moins de 10 minutes.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
                            <div className="hidden md:block absolute top-[52px] left-[calc(25%+16px)] right-[calc(25%+16px)] h-px bg-border-default z-0" aria-hidden="true" />

                            {STEPS.map(step => (
                                <div key={step.num} className="relative z-10 flex flex-col items-start rounded-2xl bg-surface-card p-6 border border-border-subtle">
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 border border-brand/30 text-sm font-bold text-brand shrink-0">
                                        {step.num}
                                    </div>
                                    <h3 className="text-base font-semibold text-text-base mb-2">{step.title}</h3>
                                    <p className="text-sm text-text-secondary leading-relaxed flex-1">{step.desc}</p>
                                    {step.cta && step.href && (
                                        <ScrollLink
                                            href={step.href}
                                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-brand-hover transition-colors"
                                        >
                                            {step.cta}
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </ScrollLink>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-sm text-text-secondary mb-4">Des questions avant de commencer ?</p>
                            <a
                                href={COMPANY.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl border border-[#6FA3C8]/50 bg-[#6FA3C8]/5 px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-[#6FA3C8]/12"
                            >
                                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.527 5.848L.057 23.5l5.797-1.521A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.012-1.37l-.36-.214-3.719.975.993-3.624-.235-.373A9.818 9.818 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182S21.818 6.591 21.818 12 17.409 21.818 12 21.818z" />
                                </svg>
                                Parler à un conseiller WhatsApp
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── FAQ ── */}
                <section id="faq" className="bg-surface-section px-5 py-20 sm:py-24 scroll-mt-20">
                    <div className="mx-auto max-w-3xl">
                        <div className="text-center mb-14">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Questions fréquentes</p>
                            <h2 className="text-3xl font-bold text-text-base sm:text-4xl tracking-[-0.02em] mb-3">
                                Vos questions, nos réponses
                            </h2>
                            <p className="text-base text-text-secondary max-w-[42ch] mx-auto">
                                Tout ce que vous devez savoir avant de vous abonner.
                            </p>
                        </div>
                        <div className="space-y-3">
                            {FAQ.map(item => (
                                <details
                                    key={item.q}
                                    className="group rounded-2xl bg-surface-section border border-border-subtle px-6 py-5 cursor-pointer transition-[background-color,border-color] duration-200 open:bg-surface-card open:border-brand/40 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand/40"
                                >
                                    <summary className="flex items-center justify-between gap-4 font-semibold text-text-base list-none select-none [&::-webkit-details-marker]:hidden">
                                        <span>{item.q}</span>
                                        <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-raised group-open:bg-brand/15 transition-colors duration-200">
                                            <svg
                                                className="h-4 w-4 text-text-faint group-open:text-brand transition-transform duration-200 group-open:rotate-180"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="mt-4 pb-1 text-sm text-text-secondary leading-relaxed">
                                        {item.aNode ?? item.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── STARLINK PARTNER ── */}
                <section className="relative overflow-hidden bg-surface-raised px-5 py-20 sm:py-28">
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(96,150,186,0.12),transparent)]" />
                        <div className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-brand/6 blur-3xl" />
                        <div className="absolute bottom-1/4 left-1/4 h-56 w-56 rounded-full bg-[#6096BA]/6 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-3xl text-center">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-medium text-brand">
                            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" aria-hidden="true" />
                            Partenaire officiel Starlink au Sénégal
                        </div>

                        <h2 className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl text-text-base mb-5 leading-[1.1]">
                            Vous êtes dans une zone difficile ?{' '}
                            <span className="bg-linear-to-r from-[#6FA3C8] to-[#A3CEF1] bg-clip-text text-transparent">
                                Nous avons une solution.
                            </span>
                        </h2>

                        <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-[52ch] mx-auto">
                            TDK Telecom est partenaire Starlink au Sénégal. Nous installons et activons
                            votre connexion satellite, même là où il n&apos;y a pas de réseau fixe.
                        </p>

                        <ul className="mb-10 inline-flex flex-col items-start gap-3 text-sm text-text-secondary">
                            {[
                                'Connexion Internet par satellite, disponible partout',
                                'Installation assurée par nos techniciens locaux',
                                'Abonnements dès 22 000 F/mois via Wave ou Orange Money',
                            ].map(item => (
                                <li key={item} className="flex items-center gap-2.5">
                                    <CheckIcon />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div>
                            <Link
                                href="/starlink"
                                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-[#121A26] hover:bg-brand-hover transition-colors"
                            >
                                Voir les offres Starlink
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── CTA FINALE ── */}
                <section className="px-5 py-20 sm:py-28 bg-surface-section">
                    <div className="mx-auto max-w-6xl">
                        <div className="rounded-2xl bg-surface-card px-8 py-16 sm:px-14 sm:py-20 text-center border border-border-subtle shadow-[var(--shadow-card-md)]">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Prêt à vous connecter ?</p>
                            <h2 className="text-3xl font-bold sm:text-4xl tracking-[-0.02em] mb-4 max-w-[28ch] mx-auto text-text-base">
                                Prêt à avoir une vraie connexion ?
                            </h2>
                            <p className="text-base text-text-secondary mb-10 max-w-[46ch] mx-auto leading-relaxed">
                                Choisissez votre forfait, payez en quelques secondes depuis Wave ou Orange Money,
                                et notre équipe s&apos;occupe du reste.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <ScrollLink
                                    href="#offres"
                                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand px-8 text-sm font-bold text-[#121A26] hover:bg-brand-hover transition-colors shadow-sm"
                                >
                                    Choisir mon forfait maintenant
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </ScrollLink>
                                <a
                                    href={COMPANY.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-brand/60 bg-transparent px-8 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
                                >
                                    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.527 5.848L.057 23.5l5.797-1.521A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.012-1.37l-.36-.214-3.719.975.993-3.624-.235-.373A9.818 9.818 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182S21.818 6.591 21.818 12 17.409 21.818 12 21.818z" />
                                    </svg>
                                    Parler à un conseiller
                                </a>
                            </div>

                            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
                                {['Paiement 100% sécurisé', 'Wave & Orange Money acceptés', 'Aucun frais caché'].map(label => (
                                    <span key={label} className="flex items-center gap-1.5">
                                        <svg className="h-4 w-4 flex-none text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICES_JSON_LD) }}
                />
            </main>

            <PublicFooter />

        </div>
    );
}
