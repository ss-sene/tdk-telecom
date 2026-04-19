import { NextResponse }         from 'next/server';
import type { NextRequest }     from 'next/server';
import { verifySessionToken }   from '@/core/auth/session';
import { checkLoginRate, checkWebhookRate } from '@/core/auth/rate-limit';

export const config = {
    matcher: ['/admin/:path*', '/login', '/api/payment/webhooks/:path*'],
};

function getClientIp(req: NextRequest): string {
    return (
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        req.headers.get('x-real-ip') ??
        'unknown'
    );
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Rate limiting ─────────────────────────────────────────────────────────
    if (pathname === '/login' && request.method === 'POST') {
        const { allowed, retryAfterMs } = checkLoginRate(getClientIp(request));
        if (!allowed) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
            });
        }
    }

    if (pathname.startsWith('/api/payment/webhooks/')) {
        const { allowed, retryAfterMs } = checkWebhookRate(getClientIp(request));
        if (!allowed) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
            });
        }
    }

    // ── Admin auth guard ──────────────────────────────────────────────────────
    if (pathname.startsWith('/admin')) {
        const token   = request.cookies.get('admin_session')?.value ?? '';
        const isValid = token.length > 0 && await verifySessionToken(token);

        if (!isValid) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}
