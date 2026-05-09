import { ScrollLink } from '@/components/ui/ScrollLink';
import { COMPANY }    from '@/lib/company';

const REASSURANCE = [
    { label: 'Disponible dans 14 régions du Sénégal' },
    { label: 'Paiement Wave & Orange Money' },
    { label: 'Installation par des techniciens locaux' },
    { label: 'Support rapide par téléphone et WhatsApp' },
] as const;

export function HomeHero() {
    return (
        <section className="relative overflow-hidden border-b border-white/5 bg-surface-section px-5 py-20 sm:py-28 lg:py-36">

            {/* Décor atmosphérique */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(111,163,200,0.08),transparent)]" />
                <div className="absolute top-0 left-1/2 h-px w-3/4 max-w-2xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#6FA3C8]/25 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-3xl text-center">

                {/* Badge */}
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#6FA3C8]/30 bg-[#6FA3C8]/10 px-4 py-1.5 text-xs font-medium text-brand">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success animate-pulse" aria-hidden="true" />
                    Disponible dans 14 régions du Sénégal
                </div>

                {/* H1 */}
                <h1 className="mb-5 text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-text-base">
                    Enfin un internet qui fonctionne vraiment{' '}
                    <span className="bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                        chez vous.
                    </span>
                </h1>

                {/* Sous-titre */}
                <p className="mx-auto mb-10 max-w-[54ch] text-base text-text-secondary leading-relaxed sm:text-lg">
                    Avec TDK Telecom, vous avez une connexion stable, un prix clair
                    et une installation prise en charge par des techniciens locaux.
                    Vous choisissez votre offre, vous payez depuis votre téléphone,
                    et nous nous occupons du reste.
                </p>

                {/* CTAs */}
                <div className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <ScrollLink
                        href="#offres"
                        className="inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-[#121A26] transition-all hover:brightness-110"
                    >
                        Choisir mon forfait
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </ScrollLink>
                    <a
                        href={COMPANY.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#6FA3C8]/50 bg-[#6FA3C8]/5 px-7 text-sm font-semibold text-brand transition-colors hover:bg-[#6FA3C8]/12"
                    >
                        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.118 1.527 5.848L.057 23.5l5.797-1.521A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.825 9.825 0 01-5.012-1.37l-.36-.214-3.719.975.993-3.624-.235-.373A9.818 9.818 0 012.182 12C2.182 6.591 6.591 2.182 12 2.182S21.818 6.591 21.818 12 17.409 21.818 12 21.818z" />
                        </svg>
                        Parler à un conseiller WhatsApp
                    </a>
                </div>

                {/* Barre de réassurance */}
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted">
                    {REASSURANCE.map(({ label }) => (
                        <span key={label} className="flex items-center gap-1.5">
                            <svg className="h-3.5 w-3.5 shrink-0 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {label}
                        </span>
                    ))}
                </div>

            </div>
        </section>
    );
}
