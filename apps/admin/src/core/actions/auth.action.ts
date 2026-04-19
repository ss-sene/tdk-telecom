'use server';

import { cookies }             from 'next/headers';
import { redirect }            from 'next/navigation';
import { timingSafeEqual }     from 'crypto';
import { createSessionToken }  from '@/core/auth/session';

export interface AuthState {
    error?: string;
}

export async function authenticate(_prevState: AuthState, formData: FormData): Promise<AuthState> {
    const password = formData.get('password');
    if (typeof password !== 'string' || password.length === 0) {
        return { error: 'Identifiants invalides ou non autorisés.' };
    }

    const secret = process.env.ADMIN_SECRET_TOKEN ?? '';
    // Timing-safe comparison to prevent secret-length inference
    const pwBuf  = Buffer.from(password.padEnd(secret.length));
    const skBuf  = Buffer.from(secret.padEnd(password.length));
    const isValid =
        password.length === secret.length &&
        timingSafeEqual(pwBuf, skBuf);

    if (!isValid) {
        return { error: 'Identifiants invalides ou non autorisés.' };
    }

    const cookieStore = await cookies();
    cookieStore.set('admin_session', await createSessionToken(), {
        httpOnly: true,
        secure:   process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path:     '/',
        maxAge:   60 * 60 * 8,
    });

    redirect('/admin');
}

export async function logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/login');
}
