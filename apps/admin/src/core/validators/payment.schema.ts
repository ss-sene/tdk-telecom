// core/validators/payment.schema.ts
// ⚠️ Importé par CheckoutFormClient ('use client')
// Ne jamais importer depuis @/generated/prisma/client ici

import { z } from 'zod';

export const InitiatePaymentSchema = z.object({
    firstName:      z.string().min(2, 'Prénom requis (2 caractères minimum)'),
    lastName:       z.string().min(2, 'Nom requis (2 caractères minimum)'),
    email:          z.string().email('Email invalide').optional().or(z.literal('')),
    phone:          z.string().refine(
        v => /^(77|78|76|75|70)\d{7}$/.test(v),
        'Numéro invalide (9 chiffres sans indicatif)'
    ),
    villageId:      z.string().min(1, 'Zone de couverture requise'),
    newVillageName: z.string().optional(),
    amount:         z.number().int().positive('Montant invalide'),
    provider:       z.enum(['WAVE', 'ORANGE_MONEY'], { message: 'Veuillez choisir un moyen de paiement' }),
}).refine(data => {
    if (data.villageId === 'OTHER') {
        return !!data.newVillageName && data.newVillageName.trim().length > 1;
    }
    return true;
}, {
    message: 'Veuillez préciser le nom de votre zone de couverture',
    path:    ['newVillageName'],
});

export type InitiatePaymentDto = z.infer<typeof InitiatePaymentSchema>;
export type PaymentProvider    = 'WAVE' | 'ORANGE_MONEY';
