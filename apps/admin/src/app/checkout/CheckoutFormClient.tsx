// app/checkout/CheckoutFormClient.tsx
'use client';

import { useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { initiatePayment } from '@/core/actions/payment.action';

const BRAND = {
    name: "TDK Telecom",
    colors: { primary: "#1A3C9F", primaryHover: "#142E7B" }
};

type PaymentProvider = 'WAVE' | 'ORANGE_MONEY';

interface Village {
    id: string;
    titre: string;
}

export function CheckoutFormClient({ villages }: { villages: Village[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    // Nouvel état pour gérer l'affichage conditionnel
    const [isOtherVillage, setIsOtherVillage] = useState(false);

    const planName = searchParams.get('plan') || 'Pack Standard';
    const priceTTC = parseInt(searchParams.get('price') || '10000', 10);

    const handlePaymentSubmit = (formData: FormData) => {
        setErrorMessage(null);

        const phone = formData.get('phone') as string;
        const provider = formData.get('provider') as PaymentProvider;
        const firstName = formData.get('firstname') as string;
        const lastName = formData.get('lastname') as string;
        const email = formData.get('email') as string;
        const villageId = formData.get('villageId') as string;
        const newVillageName = formData.get('newVillageName') as string | null;

        const cleanPhone = phone.replace(/\s/g, '');
        if (cleanPhone.length !== 9 || !/^(77|78|76|75|70)/.test(cleanPhone)) {
            setErrorMessage("Numéro invalide. Il doit commencer par 77, 78, 76, 75 ou 70.");
            return;
        }

        if (!villageId) {
            setErrorMessage("Veuillez sélectionner une zone de couverture.");
            return;
        }

        if (villageId === 'OTHER' && (!newVillageName || newVillageName.trim().length < 2)) {
            setErrorMessage("Veuillez préciser le nom de votre zone de couverture.");
            return;
        }

        startTransition(async () => {
            const response = await initiatePayment({
                firstName, 
                lastName, 
                email, 
                phone: cleanPhone, 
                villageId, 
                newVillageName: newVillageName || undefined, // Transmission du champ conditionnel
                plan: planName, 
                provider
            });

            if (response.success && response.redirectUrl) {
                router.push(response.redirectUrl);
            } else {
                setErrorMessage(response.error || "Une erreur de communication est survenue.");
            }
        });
    };

    const inputClasses = `w-full rounded-xl border border-gray-300 px-4 py-3 text-sm transition-all focus:outline-none focus:border-[${BRAND.colors.primary}] focus:ring-2 focus:ring-[${BRAND.colors.primary}]/20 disabled:bg-gray-100 disabled:cursor-not-allowed`;

    return (
        <div className="bg-gray-50 py-5 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <form action={handlePaymentSubmit} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 m-0 items-start">
                {/* ... (début du formulaire identique) ... */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Informations de facturation</h1>
                        <p className="text-gray-500 mt-2 text-sm">Finalisez votre commande pour le {planName}.</p>
                    </div>

                    {errorMessage && (
                        <div className="rounded-xl bg-red-50 p-4 flex items-center gap-3 text-sm font-medium text-red-800 border border-red-200">
                            {errorMessage}
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom <span className="text-red-500">*</span></label>
                            <input name="firstname" type="text" required placeholder="Modou" disabled={isPending} className={inputClasses} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom <span className="text-red-500">*</span></label>
                            <input name="lastname" type="text" required placeholder="Diop" disabled={isPending} className={inputClasses} />
                        </div>
                    </div>

                    {/* BLOC VILLAGE MODIFIÉ */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Où souhaitez-vous installer la connexion ? <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="villageId" 
                            required 
                            disabled={isPending} 
                            className={`${inputClasses} bg-gray-50 cursor-pointer font-medium text-gray-700`}
                            onChange={(e) => setIsOtherVillage(e.target.value === 'OTHER')}
                        >
                            <option value="" disabled selected>Sélectionnez votre village</option>
                            {villages.map(village => (
                                <option key={village.id} value={village.id}>
                                    {village.titre}
                                </option>
                            ))}
                            {/* L'option d'échappement */}
                            <option value="OTHER" className="font-bold text-[#1A3C9F]">+ Ma zone n'est pas dans la liste</option>
                        </select>

                        {/* Rendu conditionnel du champ texte en O(1) */}
                        {isOtherVillage && (
                            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                                    Précisez le nom de votre zone
                                </label>
                                <input 
                                    name="newVillageName" 
                                    type="text" 
                                    required={isOtherVillage} 
                                    placeholder="Ex: Keur Massar, Mamelles..." 
                                    disabled={isPending} 
                                    className={`${inputClasses} border-[#1A3C9F] ring-1 ring-[#1A3C9F]/20`} 
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse mail</label>
                        <input name="email" type="email" placeholder="modou.diop@email.sn" disabled={isPending} className={inputClasses} />
                    </div>

                    {/* ... (Suite du formulaire : Téléphone & Fournisseurs identique) ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Mobile Money <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 flex items-center gap-2 pointer-events-none">
                                <span className="text-sm font-medium text-gray-700">+221</span>
                            </div>
                            <input name="phone" type="tel" maxLength={9} required placeholder="771234567" disabled={isPending} className={`${inputClasses} pl-16 font-mono`} />
                        </div>
                    </div>

                    <div className="pt-4">
                        <span className="block text-sm font-medium text-gray-700 mb-3">Moyen de paiement <span className="text-red-500">*</span></span>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`relative flex cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
                                <input type="radio" name="provider" value="WAVE" className="peer sr-only" required disabled={isPending} />
                                <div className="flex w-full items-center justify-center font-bold text-gray-700 peer-checked:text-blue-500">Wave</div>
                            </label>
                            <label className={`relative flex cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50 focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
                                <input type="radio" name="provider" value="ORANGE_MONEY" className="peer sr-only" required disabled={isPending} />
                                <div className="flex w-full items-center justify-center font-bold text-gray-700 peer-checked:text-orange-500">Orange Money</div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* ... (Panneau de résumé de droite identique) ... */}
                <div className="lg:col-span-5 w-full">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sticky top-8">
                        <div className="text-center mb-8">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Montant à payer</h2>
                            <div className="text-4xl font-extrabold text-gray-900">{priceTTC.toLocaleString('fr-FR')} FCFA</div>
                        </div>

                        <div className="border-t border-gray-100 pt-6 pb-4 space-y-4 text-sm">
                            <div className="flex justify-between text-gray-600 font-medium">
                                <span>Désignation</span>
                                <span>Prix</span>
                            </div>
                            <div className="flex justify-between text-gray-900 font-bold text-base items-center">
                                <span>{planName}</span>
                                <span>{priceTTC.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                        </div>

                        <div className="pt-6 space-y-3 text-sm border-t border-gray-100 mt-4">
                            <div className="flex justify-between text-gray-900 font-bold text-xl pt-4">
                                <span>Total TTC</span>
                                <span style={{ color: BRAND.colors.primary }}>{priceTTC.toLocaleString('fr-FR')} FCFA</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            style={{ backgroundColor: isPending ? undefined : BRAND.colors.primary }}
                            className={`mt-8 w-full text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 ${isPending ? 'bg-gray-400 cursor-not-allowed opacity-70' : `hover:bg-[${BRAND.colors.primaryHover}]`}`}
                        >
                            {isPending ? 'Initialisation...' : `Payer ${priceTTC.toLocaleString('fr-FR')} FCFA`}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}