
// core/validators/payment.schema.ts
import { z } from 'zod';
import { PaymentProvider } from '@/generated/prisma/client';
import { TDK_PLANS_ARRAY, getPriceByPlanName } from '@tdk/config';

// Génère un tableau des montants autorisés : [10000, 12000]
const validPrices = TDK_PLANS_ARRAY.map(p => p.price);

export const InitiatePaymentSchema = z.object({
    firstName: z.string().min(2).max(50).trim(),
    lastName: z.string().min(2).max(50).trim(),
    email: z.email().max(100).optional().or(z.literal('')),
    villageId: z.string().min(1, "Zone de couverture requise"),
    newVillageName: z.string().optional(), // Nouveau champ conditionnel
    phone: z.string().regex(/^(77|78|76|75|70)\d{7}$/, "Format sénégalais invalide"),
    plan: z.string().max(50),
    provider: z.enum(PaymentProvider),
}).refine(data => {
    // Règle métier : Si "Autre" est sélectionné, le nom de la zone doit être fourni
    if (data.villageId === 'OTHER') {
        return data.newVillageName !== undefined && data.newVillageName.trim().length > 1;
    }
    return true;
}, {
    message: "Veuillez préciser le nom de votre zone de couverture",
    path: ["newVillageName"]
});