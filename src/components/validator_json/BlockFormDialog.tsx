"use client";

import { forwardRef, lazy, Suspense, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BlockKey } from "@/lib/schemas";

// Мапа форм для ледачого завантаження
const FORM_COMPONENTS = {
    about_primary: lazy(() => import("@/components/validator_json/forms/AboutPrimaryForm")),
    app_about_primary: lazy(() => import("@/components/validator_json/forms/AppAboutPrimaryForm")),
    mobile_app: lazy(() => import("./forms/MobileAppForm")),
    bonus_about_primary: lazy(() => import("./forms/bonus/BonusAboutPrimaryForm")),
    bonus_bonuses: lazy(() => import("./forms/bonus/BonusBonusesForm")),
    bonus_hero: lazy(() => import("./forms/bonus/BonusHeroForm")),
    bonus_cashback_about_primary: lazy(() => import("./forms/bonus_cashback/BonusCashbackAboutPrimaryForm")),
    bonus_deposit_about_primary: lazy(() => import("./forms/bonus_deposit/AboutPrimaryForm")),
    bonus_deposit_bonuses: lazy(() => import("./forms/bonus_deposit/BonusesForm")),
    bonus_freebet_about_primary: lazy(() => import("@/components/validator_json/forms/bonus_freebet/AboutPrimaryForm")),
    bonus_freebet_bonuses: lazy(() => import("@/components/validator_json/forms/bonus_freebet/BonusesForm")),
    bonus_freespin_about_primary: lazy(() => import("@/components/validator_json/forms/bonus_freespin/AboutPrimaryForm")),
    bonus_freespin_bonuses: lazy(() => import("@/components/validator_json/forms/bonus_freespin/BonusesForm")),
    bonus_promocode_about_primary: lazy(() => import("@/components/validator_json/forms/bonus_promocode/AboutPrimaryForm")),
    bonus_promocode_bonuses: lazy(() => import("@/components/validator_json/forms/bonus_promocode/BonusesForm")),
    contacts_about_primary: lazy(() => import("@/components/validator_json/forms/contacts/AboutPrimaryForm")),
    faq_about_primary: lazy(() => import("@/components/validator_json/forms/faq/AboutPrimaryForm")),
    footer_footer: lazy(() => import("@/components/validator_json/forms/footer/FooterForm")),
    header_header: lazy(() => import("@/components/validator_json/forms/header/HeaderForm")),
    home_about: lazy(() => import("./forms/home/AboutForm")),
    home_about_primary: lazy(() => import("./forms/home/AboutPrimaryForm")),
    home_bonuses: lazy(() => import("./forms/home/BonusesForm")),
    home_casino: lazy(() => import("./forms/home/CasinoForm")),
    home_faq: lazy(() => import("./forms/home/FaqForm")),
    home_feature_cards: lazy(() => import("./forms/home/FeatureCardsForm")),
    home_hero: lazy(() => import("./forms/home/HeroForm")),
    home_how_to_start: lazy(() => import("./forms/home/HowToStartForm")),
    home_mobile_app: lazy(() => import("@/components/validator_json/forms/home/MobileAppForm")),
    home_payments: lazy(() => import("./forms/home/PaymentsForm")),
    home_registration_guide: lazy(() => import("@/components/validator_json/forms/home/RegistrationGuideForm")),
    home_sports: lazy(() => import("./forms/home/SportsForm")),
    home_support: lazy(() => import("@/components/validator_json/forms/home/SupportForm")),
    home_top_feature: lazy(() => import("@/components/validator_json/forms/home/TopFeatureForm")),
    home_verification: lazy(() => import("@/components/validator_json/forms/home/VerificationForm")),
    responsiblegame_about_primary: lazy(() => import("@/components/validator_json/forms/responsiblegame/AboutPrimaryForm")),
    slots_about_primary: lazy(() => import("@/components/validator_json/forms/slots/AboutPrimaryForm")),
    slots_casino: lazy(() => import("@/components/validator_json/forms/slots/CasinoForm")),
    slots_hero: lazy(() => import("@/components/validator_json/forms/slots/HeroForm")),
    slots_aviator_about_primary: lazy(() => import("@/components/validator_json/forms/slots_aviator/AboutPrimaryForm")),
    slots_bookofdead_about_primary: lazy(() => import("@/components/validator_json/forms/slots_bookofdead/AboutPrimaryForm")),
    slots_bookofradeluxe_about_primary: lazy(() => import("@/components/validator_json/forms/slots_bookofradeluxe/AboutPrimaryForm")),
    slots_chickenroad_about_primary: lazy(() => import("@/components/validator_json/forms/slots_chickenroad/AboutPrimaryForm")),
    slots_fruitcocktail_about_primary: lazy(() => import("@/components/validator_json/forms/slots_fruitcocktail/AboutPrimaryForm")),
    slots_plinko_about_primary: lazy(() => import("@/components/validator_json/forms/slots_plinko/AboutPrimaryForm")),
    slots_popular_about_primary: lazy(() => import("@/components/validator_json/forms/slots_popular/AboutPrimaryForm")),
    slots_popular_casino: lazy(() => import("@/components/validator_json/forms/slots_popular/CasinoForm")),
    sportsbook_about_primary: lazy(() => import("@/components/validator_json/forms/sportsbook/AboutPrimaryForm")),
    sportsbook_hero: lazy(() => import("@/components/validator_json/forms/sportsbook/HeroForm")),
    sportsbook_basketball_about_primary: lazy(() => import("@/components/validator_json/forms/sportsbook_basketball/AboutPrimaryForm")),
    sportsbook_football_about_primary: lazy(() => import("@/components/validator_json/forms/sportsbook_football/AboutPrimaryForm")),
    seo_seo: lazy(() => import("./forms/seo/SeoForm")),
} as const;

type Props = {
    schema: any | null;
    block: BlockKey | "";
    initialValues: any;
    onCancel: () => void;
    onSave: (v: any) => void;

};

const BlockFormDialog = forwardRef<HTMLDialogElement, Props>(({ schema, block, initialValues, onCancel, onSave }, ref) => {
    return (
        <dialog
            ref={ref}
            id="formDialog"
            className="p-0 rounded-2xl border border-slate-200/60 shadow-2xl backdrop:backdrop-blur-sm backdrop:bg-black/50 bg-white text-slate-800 dark:bg-[#0f172a] dark:text-slate-100 dark:border-white/10"
        >
            <Suspense fallback={<div>Loading form...</div>}>
                <FormContent schema={schema} block={block} initialValues={initialValues} onCancel={onCancel} onSave={onSave} />
            </Suspense>
            <style jsx global>{`
        #formDialog::backdrop {
          background: rgba(0, 0, 0, 0.55);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
        }
      `}</style>
        </dialog>
    );
});

BlockFormDialog.displayName = "BlockFormDialog";

function FormContent({ schema, block, initialValues, onCancel, onSave }: Props) {
    const form = useForm<any>({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: initialValues,
    });

    const { register, handleSubmit, control, formState: { errors }, reset, watch, setValue } = form;
    const draft = watch();

    const onSubmit = handleSubmit((values) => {
        onSave(values);
        reset();
    });

    // Мемоїзація компонента форми
    const FormComponent = useMemo(() => {
        if (!block || !(block in FORM_COMPONENTS)) return null;
        return FORM_COMPONENTS[block as keyof typeof FORM_COMPONENTS];
    }, [block]);

    if (!FormComponent) return null;

    return (
        <form onSubmit={onSubmit} className="w-[92vw] max-w-[900px] overflow-hidden rounded-2xl">
            <div className="sticky top-0 z-10 border-b border-slate-200/70 bg-gradient-to-r from-sky-50 to-white dark:from-sky-950/30 dark:to-transparent dark:border-white/10">
                <div className="px-6 py-4">
                    <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[28px] tracking-tight">
            <span className="bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent dark:from-sky-300 dark:to-sky-200">
              {block}
            </span>
                    </h3>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        Заповніть поля блоку та збережіть зміни
                    </p>
                </div>
            </div>

            <div
                className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/70 dark:[&::-webkit-scrollbar-thumb]:bg-white/20"
            >
                <FormComponent
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                    errors={errors}
                    sourceTemplate={draft} // Для форм, які потребують draft, наприклад header_header
                />
            </div>

            <div className="sticky bottom-0 z-10 border-t border-slate-200/70 bg-white/90 backdrop-blur px-6 py-4 flex justify-end gap-3 dark:bg-[#0f172a]/90 dark:border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300/70 px-4 py-2 text-sm font-medium hover:bg-slate-50 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:border-white/15 dark:hover:bg-white/5 dark:ring-offset-[#0f172a]"
                >
                    Скасувати
                </button>
                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:from-sky-500 hover:to-sky-400 active:scale-[0.99] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 dark:ring-offset-[#0f172a]"
                >
                    Зберегти блок
                </button>
            </div>
        </form>
    );
}

export default BlockFormDialog;