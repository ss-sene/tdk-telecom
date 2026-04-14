'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const NAV_ITEMS = [
    { href: '#offres',            label: 'Offres' },
    { href: '#comment-ca-marche', label: 'Comment ça marche' },
    { href: '#faq',               label: 'FAQ' },
];

export function LandingMobileNav() {
    const [open, setOpen]       = useState(false);
    // Guard SSR : document.body n'existe pas côté serveur
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Bloque le scroll du body quand le menu est ouvert
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const close = () => setOpen(false);

    // Le drawer est rendu via portal à document.body — il échappe
    // au containing block créé par backdrop-filter sur le <header>
    const drawer = (
        <div
            id="landing-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="fixed inset-0 z-[999] flex flex-col bg-white"
        >
            {/* En-tête */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <span className="text-base font-black text-brand">TDK Telecom</span>
                <button
                    type="button"
                    onClick={close}
                    aria-label="Fermer le menu"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Liens — <a> natif pour le scroll d'ancrage */}
            <nav className="flex-1 overflow-y-auto" aria-label="Menu principal">
                {NAV_ITEMS.map(item => (
                    <a
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className="flex items-center justify-between border-b border-gray-100 px-6 py-5 text-lg font-semibold text-gray-800 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                        {item.label}
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                ))}
            </nav>
        </div>
    );

    return (
        <>
            {/* Bouton hamburger — dans le header pour le layout */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-controls="landing-mobile-menu"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
                {open ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Portal : téléporte le drawer à document.body */}
            {mounted && open && createPortal(drawer, document.body)}
        </>
    );
}
