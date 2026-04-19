import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tdktelecom.sn';

export const metadata: Metadata = {
  title: {
    default:  "TDK Telecom — Internet Haut Débit au Sénégal",
    template: "%s — TDK Telecom",
  },
  description: "TOUBA DAROU KHOUDOSS TELECOM — Souscrivez à Internet haut débit au Sénégal. Connexion fiable, installation accompagnée, paiement Wave ou Orange Money.",
  metadataBase: new URL(APP_URL),
  openGraph: {
    type:        "website",
    locale:      "fr_SN",
    url:         APP_URL,
    siteName:    "TDK Telecom",
    title:       "TDK Telecom — Internet Haut Débit au Sénégal",
    description: "TOUBA DAROU KHOUDOSS TELECOM — Internet fiable au Sénégal. Paiement Wave ou Orange Money.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "TDK Telecom — Internet Haut Débit au Sénégal",
    description: "TOUBA DAROU KHOUDOSS TELECOM — Internet fiable au Sénégal.",
  },
  robots: {
    index:  true,
    follow: true,
  },
};

const JSON_LD = {
  "@context":      "https://schema.org",
  "@type":         ["Organization", "LocalBusiness"],
  "name":          "TOUBA DAROU KHOUDOSS TELECOM",
  "alternateName": "TDK Telecom",
  "url":           APP_URL,
  "logo":          `${APP_URL}/logo.png`,
  "telephone":     "+221771419283",
  "email":         "tdktelecom@gmail.com",
  "priceRange":    "10 000 – 30 000 FCFA",
  "openingHours":  "Mo-Su 00:00-23:59",
  "areaServed": {
    "@type":  "Country",
    "name":   "Sénégal",
    "sameAs": "https://www.wikidata.org/wiki/Q1041",
  },
  "contactPoint": {
    "@type":             "ContactPoint",
    "telephone":         "+221771419283",
    "contactType":       "customer service",
    "areaServed":        "SN",
    "availableLanguage": ["French", "Wolof"],
  },
  "address": {
    "@type":           "PostalAddress",
    "streetAddress":   "Touba Darou Khoudoss",
    "addressLocality": "Touba Darou Khoudoss",
    "addressRegion":   "Diourbel",
    "addressCountry":  "SN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className={`${inter.variable} antialiased selection:bg-brand selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
