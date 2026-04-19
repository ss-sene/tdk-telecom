// Shared footer for /boutique, /starlink, and future public pages.
import Link  from 'next/link';
import Image from 'next/image';
import { COMPANY } from '@/lib/company';

const NAV_LINKS = [
    { href: '/#offres',                       label: 'Offres'                      },
    { href: '/#comment-ca-marche',            label: 'Comment ça marche'           },
    { href: '/#faq',                          label: 'FAQ'                         },
    { href: '/boutique',                      label: 'Boutique'                    },
    { href: '/starlink',                      label: 'Starlink'                    },
    { href: '/checkout',                      label: "S'abonner"                   },
    { href: '/mentions-legales',              label: 'Mentions légales'            },
    { href: '/politique-de-confidentialite',  label: 'Politique de confidentialité'},
    { href: '/cgu',                           label: 'CGU'                         },
];

export function PublicFooter() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900 px-5 py-14">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Marque */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8">
                                <Image src="/logo.png" alt={COMPANY.shortName} fill className="object-contain" sizes="32px" />
                            </div>
                            <span className="font-black tracking-tight text-brand">{COMPANY.shortName}</span>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            {COMPANY.name}
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Fournisseur d&apos;accès Internet haut débit au Sénégal. Connexion fiable pour particuliers, entreprises et institutions.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Navigation</p>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Contact</p>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-start gap-2.5">
                                <svg className="h-4 w-4 flex-none text-brand mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{COMPANY.address}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg className="h-4 w-4 flex-none text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href={`tel:${COMPANY.phone}`} className="hover:text-slate-100 transition-colors">
                                    {COMPANY.phoneDisplay}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg className="h-4 w-4 flex-none text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href={`mailto:${COMPANY.email}`} className="hover:text-slate-100 transition-colors">
                                    {COMPANY.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} {COMPANY.name}. Tous droits réservés.</p>
                    <div className="flex gap-4">
                        <Link href="/mentions-legales" className="hover:text-slate-300 transition-colors">Mentions légales</Link>
                        <Link href="/politique-de-confidentialite" className="hover:text-slate-300 transition-colors">Confidentialité</Link>
                        <Link href="/cgu" className="hover:text-slate-300 transition-colors">CGU</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
