import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tdktelecom.sn';
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/api/', '/login'],
            },
        ],
        sitemap: `${base}/sitemap.xml`,
    };
}
