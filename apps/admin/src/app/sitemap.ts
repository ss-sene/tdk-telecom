import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tdktelecom.sn';

    return [
        { url: `${base}/`,                              lastModified: new Date('2026-04-20'), changeFrequency: 'weekly',  priority: 1.0 },
        { url: `${base}/boutique`,                      lastModified: new Date('2026-04-20'), changeFrequency: 'weekly',  priority: 0.8 },
        { url: `${base}/starlink`,                      lastModified: new Date('2026-04-20'), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/mentions-legales`,              lastModified: new Date('2026-04-20'), changeFrequency: 'yearly',  priority: 0.3 },
        { url: `${base}/politique-de-confidentialite`,  lastModified: new Date('2026-04-20'), changeFrequency: 'yearly',  priority: 0.3 },
        { url: `${base}/cgu`,                           lastModified: new Date('2026-04-20'), changeFrequency: 'yearly',  priority: 0.3 },
    ];
}
