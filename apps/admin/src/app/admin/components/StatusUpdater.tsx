'use client';

import { useState, useTransition } from 'react';
import { PaymentStatus } from '@/generated/prisma/client';
import { updatePaymentStatus } from '@/core/actions/admin.action';

const STATUS_OPTIONS = [
    { value: 'SUCCESS',  label: 'Confirmé' },
    { value: 'PENDING',  label: 'En attente' },
    { value: 'FAILED',   label: 'Échoué' },
    { value: 'REFUNDED', label: 'Remboursé' },
];

const STYLES: Record<PaymentStatus, string> = {
    SUCCESS:  'bg-[#2ECA50]/10 text-[#1a8c37] ring-[#2ECA50]/20',
    PENDING:  'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    FAILED:   'bg-red-50 text-red-700 ring-red-600/10',
    REFUNDED: 'bg-gray-50 text-gray-600 ring-gray-500/10',
};

export function StatusUpdater({
    paymentId,
    currentStatus,
}: {
    paymentId:     string;
    currentStatus: PaymentStatus;
}) {
    const [isPending, startTransition] = useTransition();
    const [optimisticStatus, setOptimisticStatus] = useState<PaymentStatus>(currentStatus);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as PaymentStatus;
        setOptimisticStatus(newStatus);
        setErrorMsg(null);

        startTransition(async () => {
            const response = await updatePaymentStatus(paymentId, newStatus);
            if (!response.success) {
                setOptimisticStatus(currentStatus);
                setErrorMsg(response.error ?? 'Erreur inconnue');
                // Auto-dismiss after 4s
                setTimeout(() => setErrorMsg(null), 4000);
            }
        });
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="relative inline-flex">
                <select
                    value={optimisticStatus}
                    onChange={handleChange}
                    disabled={isPending}
                    className={`appearance-none outline-none cursor-pointer inline-flex items-center rounded-lg pl-3 pr-8 py-1.5 text-xs font-bold ring-1 ring-inset transition-all disabled:opacity-70 disabled:cursor-wait ${STYLES[optimisticStatus]}`}
                >
                    {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">
                            {opt.label}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    {isPending ? (
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70" />
                    ) : (
                        <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Inline error toast — replaces alert() */}
            {errorMsg && (
                <div className="flex items-center gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-200 max-w-[200px]">
                    <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    {errorMsg}
                </div>
            )}
        </div>
    );
}
