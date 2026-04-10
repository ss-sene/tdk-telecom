// src/app/payment/success/page.tsx
// force-dynamic : statut mis à jour en temps réel via router.refresh() (PendingPoller)
import Link     from 'next/link';
import { prisma } from '@/core/db/prisma';
import { PendingPoller } from './PendingPoller';

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<{ ref?: string }>;
}

const PROVIDER_LABELS: Record<string, string> = {
    WAVE:         'Wave',
    ORANGE_MONEY: 'Orange Money',
};

export default async function PaymentSuccessPage({ searchParams }: Props) {
    const { ref } = await searchParams;

    const payment = ref
        ? await prisma.payment.findUnique({
              where:  { internalRef: ref },
              select: {
                  internalRef: true,
                  status:      true,
                  amount:      true,
                  provider:    true,
                  client: {
                      select: {
                          firstName: true,
                          lastName:  true,
                          village:   { select: { titre: true } },
                      },
                  },
              },
          })
        : null;

    const status    = payment?.status ?? null;
    const isSuccess = status === 'SUCCESS';
    const isPending = status === 'PENDING';
    const isFailed  = status === 'FAILED';

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">

            {/* Polling côté client quand le paiement est PENDING */}
            {isPending && payment && (
                <PendingPoller internalRef={payment.internalRef} />
            )}

            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8 text-center">

                {/* Icône statut */}
                {isSuccess && (
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2ECA50]/10">
                        <svg className="h-8 w-8 text-[#2ECA50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                )}

                {isPending && (
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
                        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-yellow-400 border-t-transparent" />
                    </div>
                )}

                {(isFailed || !payment) && (
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                )}

                {/* Titre */}
                <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
                    {isSuccess && 'Paiement confirmé !'}
                    {isPending && 'En attente de confirmation…'}
                    {isFailed  && 'Paiement échoué'}
                    {!payment  && 'Référence introuvable'}
                </h1>

                {/* Message */}
                <p className="text-sm leading-relaxed text-gray-500 mb-6">
                    {isSuccess && 'Votre abonnement TDK Telecom est activé. Bienvenue !'}
                    {isPending && (
                        <>
                            Votre paiement a bien été soumis.{' '}
                            Nous attendons la confirmation de{' '}
                            {payment ? PROVIDER_LABELS[payment.provider] ?? payment.provider : "l'opérateur"}.
                            <br />
                            <span className="font-semibold text-gray-600">Cette page se met à jour automatiquement.</span>
                        </>
                    )}
                    {isFailed  && "Une erreur est survenue lors du paiement. Aucun montant n'a été débité."}
                    {!payment  && 'Cette référence de paiement est introuvable. Vérifiez le lien ou contactez le support.'}
                </p>

                {/* Récapitulatif */}
                {payment && (
                    <div className="rounded-2xl bg-[#F9FAFB] p-4 text-left text-sm mb-6 space-y-2.5 ring-1 ring-gray-100">
                        <Row label="Référence">
                            <span className="font-mono text-xs font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                                {payment.internalRef}
                            </span>
                        </Row>
                        <Row label="Montant">
                            <span className="font-extrabold text-gray-900">{payment.amount.toLocaleString('fr-FR')} FCFA</span>
                        </Row>
                        <Row label="Client">
                            <span className="font-bold text-gray-900">
                                {payment.client.firstName ?? ''} {payment.client.lastName ?? ''}
                            </span>
                        </Row>
                        <Row label="Zone">
                            <span className="font-bold text-gray-900">{payment.client.village.titre}</span>
                        </Row>
                        <Row label="Opérateur">
                            <span className="font-bold text-gray-900">{PROVIDER_LABELS[payment.provider] ?? payment.provider}</span>
                        </Row>
                        <Row label="Statut">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                isSuccess ? 'bg-[#2ECA50]/10 text-[#1a8c37]' :
                                isPending ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                {isSuccess ? 'Confirmé' : isPending ? 'En attente' : 'Échoué'}
                            </span>
                        </Row>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-3">
                    {(isFailed || !payment) && (
                        <Link
                            href="/checkout"
                            className="flex h-11 items-center justify-center rounded-xl bg-[#1A3C9F] px-6 text-sm font-bold text-white hover:bg-[#142E7B] transition-colors w-full"
                        >
                            Réessayer
                        </Link>
                    )}
                    <Link
                        href="/"
                        className="flex h-11 items-center justify-center rounded-xl border border-gray-200 px-6 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors w-full"
                    >
                        Retour à l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500 shrink-0">{label}</span>
            <span className="text-right">{children}</span>
        </div>
    );
}
