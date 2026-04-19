const WINDOW_MS  = 60_000; // 1 minute
const MAX_LOGIN  = 5;
const MAX_WEBHOOK = 120;

interface Window { count: number; resetsAt: number }

// In-memory store — best-effort on serverless (resets per cold start)
const store = new Map<string, Window>();

function getKey(prefix: string, ip: string): string {
    return `${prefix}:${ip}`;
}

function check(key: string, limit: number): { allowed: boolean; retryAfterMs: number } {
    const now  = Date.now();
    const win  = store.get(key);

    if (!win || win.resetsAt <= now) {
        store.set(key, { count: 1, resetsAt: now + WINDOW_MS });
        return { allowed: true, retryAfterMs: 0 };
    }

    if (win.count >= limit) {
        return { allowed: false, retryAfterMs: win.resetsAt - now };
    }

    win.count++;
    return { allowed: true, retryAfterMs: 0 };
}

export function checkLoginRate(ip: string)   { return check(getKey('login',   ip), MAX_LOGIN);   }
export function checkWebhookRate(ip: string) { return check(getKey('webhook', ip), MAX_WEBHOOK); }
