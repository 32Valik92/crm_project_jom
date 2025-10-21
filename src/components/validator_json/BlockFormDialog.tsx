"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import type {BlockKey} from "@/lib/schemas";

import AboutPrimaryForm from "@/components/validator_json/forms/AboutPrimaryForm";
import AppAboutPrimaryForm from "@/components/validator_json/forms/AppAboutPrimaryForm";
import MobileAppForm from "./forms/MobileAppForm";
import BonusAboutPrimaryForm from "./forms/bonus/BonusAboutPrimaryForm";
import BonusBonusesForm from "./forms/bonus/BonusBonusesForm";
import BonusHeroForm from "./forms/bonus/BonusHeroForm";
import BonusCashbackAboutPrimaryForm from "./forms/bonus_cashback/BonusCashbackAboutPrimaryForm";
import BonusDepositAboutPrimaryForm from "./forms/bonus_deposit/AboutPrimaryForm";
import BonusDepositBonusesForm from "./forms/bonus_deposit/BonusesForm";
import BonusFreebetAboutPrimaryForm from "@/components/validator_json/forms/bonus_freebet/AboutPrimaryForm";
import BonusFreebetBonusesForm from "@/components/validator_json/forms/bonus_freebet/BonusesForm";
import BonusFreespinAboutPrimaryForm from "@/components/validator_json/forms/bonus_freespin/AboutPrimaryForm";
import BonusFreespinBonusesForm from "@/components/validator_json/forms/bonus_freespin/BonusesForm";
import BonusPromocodeAboutPrimaryForm from "@/components/validator_json/forms/bonus_promocode/AboutPrimaryForm";
import BonusPromocodeBonusesForm from "@/components/validator_json/forms/bonus_promocode/BonusesForm";
import ContactsAboutPrimaryForm from "@/components/validator_json/forms/contacts/AboutPrimaryForm";
import FaqAboutPrimaryForm from "@/components/validator_json/forms/faq/AboutPrimaryForm";
import FooterForm from "@/components/validator_json/forms/footer/FooterForm";
import HeaderForm from "@/components/validator_json/forms/header/HeaderForm";
import SlotsAviatorAboutPrimaryForm from "@/components/validator_json/forms/slots_aviator/AboutPrimaryForm";
import ResponsibleGameAboutPrimaryForm from "@/components/validator_json/forms/responsiblegame/AboutPrimaryForm";
import SlotsAboutPrimaryForm from "@/components/validator_json/forms/slots/AboutPrimaryForm";
import SlotsHeroForm from "@/components/validator_json/forms/slots/HeroForm";
import SlotsCasinoForm from "@/components/validator_json/forms/slots/CasinoForm";
import SlotsBookOfDeadAboutPrimaryForm from "@/components/validator_json/forms/slots_bookofdead/AboutPrimaryForm";
import SlotsBookOfRaDeluxeAboutPrimaryForm
    from "@/components/validator_json/forms/slots_bookofradeluxe/AboutPrimaryForm";
import SlotsChickenRoadAboutPrimaryForm from "@/components/validator_json/forms/slots_chickenroad/AboutPrimaryForm";
import SlotsPlinkoAboutPrimaryForm from "@/components/validator_json/forms/slots_plinko/AboutPrimaryForm";
import SlotsPopularAboutPrimaryForm from "@/components/validator_json/forms/slots_popular/AboutPrimaryForm";
import SlotsPopularCasinoForm from "@/components/validator_json/forms/slots_popular/CasinoForm";
import SportsbookAboutPrimaryForm from "@/components/validator_json/forms/sportsbook/AboutPrimaryForm";
import SportsbookBasketballAboutPrimaryForm
    from "@/components/validator_json/forms/sportsbook_basketball/AboutPrimaryForm";
import SportsbookFootballAboutPrimaryForm from "@/components/validator_json/forms/sportsbook_football/AboutPrimaryForm";
import SportsbookHeroForm from "@/components/validator_json/forms/sportsbook/HeroForm";
import HomeAboutForm from "./forms/home/AboutForm";
import HomeAboutPrimaryForm from "./forms/home/AboutPrimaryForm";
import HomeBonusesForm from "./forms/home/BonusesForm";
import HomeCasinoForm from "./forms/home/CasinoForm";
import HomeFaqForm from "./forms/home/FaqForm";
import HomeFeatureCardsForm from "./forms/home/FeatureCardsForm";
import HomeHeroForm from "./forms/home/HeroForm";
import HomeHowToStartForm from "./forms/home/HowToStartForm";
import HomeMobileAppForm from "@/components/validator_json/forms/home/MobileAppForm";
import HomePaymentsForm from "./forms/home/PaymentsForm";
import HomeRegistrationGuideForm from "@/components/validator_json/forms/home/RegistrationGuideForm";
import HomeSportsForm from "./forms/home/SportsForm";
import HomeSupportForm from "@/components/validator_json/forms/home/SupportForm";
import HomeTopFeatureForm from "@/components/validator_json/forms/home/TopFeatureForm";
import HomeVerificationForm from "@/components/validator_json/forms/home/VerificationForm";
import SeoForm from "./forms/seo/SeoForm";
import SlotsFruitCocktailAboutPrimaryForm from "@/components/validator_json/forms/slots_fruitcocktail/AboutPrimaryForm";

/** ---------- API ---------- */
type Props = {
    schema: any | null;
    block: BlockKey | "";
    initialValues: any;
    onCancel: () => void;
    onSave: (v: any) => void;
};

const BlockFormDialog = ({ schema, block, initialValues, onCancel, onSave }: Props) => {
    return (
        <dialog
            id="formDialog"
            // скляний вигляд діалогу + закруглення + тінь
            className="p-0 rounded-2xl border border-slate-200/60 shadow-2xl backdrop:backdrop-blur-sm backdrop:bg-black/50 bg-white text-slate-800 dark:bg-[#0f172a] dark:text-slate-100 dark:border-white/10"
        >
            <FormContent
                schema={schema}
                block={block}
                initialValues={initialValues}
                onCancel={onCancel}
                onSave={onSave}
            />

            {/* стиль бекдропа, якщо Tailwind не підхопить variant */}
            <style jsx global>{`
        #formDialog::backdrop {
          background: rgba(0, 0, 0, 0.55);
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
        }
      `}</style>
        </dialog>
    );
};

export default BlockFormDialog;

/** ---------- ВНУТРІШНЄ ВМІСТ ДІАЛОГУ ---------- */
function FormContent({ schema, block, initialValues, onCancel, onSave }: Props) {
    const form = useForm<any>({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: initialValues,
    });

    if (!block) return null;

    const { register, handleSubmit, control, formState: { errors }, reset, watch, setValue } = form;
    const draft = watch();

    const onSubmit = handleSubmit((values) => {
        onSave(values);
        reset();
    });

    return (
        <form
            onSubmit={onSubmit}
            className="w-[92vw] max-w-[900px] overflow-hidden rounded-2xl"
        >
            {/* Хедер форми */}
            <div
                className="sticky top-0 z-10 border-b border-slate-200/70 bg-gradient-to-r from-sky-50 to-white
                   dark:from-sky-950/30 dark:to-transparent dark:border-white/10"
            >
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

            {/* Основний контент (скролиться) */}
            <div
                className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4
                   [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2
                   [&::-webkit-scrollbar-thumb]:rounded-full
                   [&::-webkit-scrollbar-thumb]:bg-slate-300/70
                   dark:[&::-webkit-scrollbar-thumb]:bg-white/20"
            >

            {block === "about_primary" &&
                <AboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            }

            {block === "app_about_primary" &&
                <AppAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            }
            {block === "mobile_app" && (
                <MobileAppForm control={control} registerAction={register}/>
            )}

            {block === "bonus_about_primary" && (
                <BonusAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "bonus_bonuses" && (
                <BonusBonusesForm control={control} registerAction={register}/>
            )}
            {block === "bonus_hero" && <BonusHeroForm registerAction={register}/>}

            {block === "bonus_cashback_about_primary" && (
                <BonusCashbackAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "bonus_deposit_about_primary" && (
                <BonusDepositAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "bonus_deposit_bonuses" && (
                <BonusDepositBonusesForm control={control} registerAction={register}/>
            )}

            {block === "bonus_freebet_about_primary" && (
                <BonusFreebetAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "bonus_freebet_bonuses" && (
                <BonusFreebetBonusesForm control={control} registerAction={register}/>
            )}

            {block === "bonus_freespin_about_primary" && (
                <BonusFreespinAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "bonus_freespin_bonuses" && (
                <BonusFreespinBonusesForm control={control} registerAction={register}/>
            )}

            {block === "bonus_promocode_about_primary" && (
                <BonusPromocodeAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "bonus_promocode_bonuses" && (
                <BonusPromocodeBonusesForm control={control} registerAction={register}/>
            )}

            {block === "contacts_about_primary" && (
                <ContactsAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "faq_about_primary" && (
                <FaqAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "footer_footer" && (
                <FooterForm control={control} registerAction={register}/>
            )}

            {block === "header_header" && (
                <HeaderForm control={control} registerAction={register} sourceTemplate={draft}/>
            )}

            {block === "home_about" && (
                <HomeAboutForm
                    control={control}
                    registerAction={register}
                />
            )}
            {block === "home_about_primary" && (
                <HomeAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "home_bonuses" && (
                <HomeBonusesForm
                    control={control}
                    registerAction={register}
                />
            )}
            {block === "home_casino" && (
                <HomeCasinoForm
                    control={control}
                    registerAction={register}
                />
            )}
            {block === "home_faq" && (
                <HomeFaqForm control={control} registerAction={register} />
            )}
            {block === "home_feature_cards" && (
                <HomeFeatureCardsForm control={control} registerAction={register} />
            )}
            {block === "home_hero" && <HomeHeroForm registerAction={register}/>}
            {block === "home_how_to_start" && (
                <HomeHowToStartForm control={control} registerAction={register} />
            )}
            {block === "home_mobile_app" && (
                <HomeMobileAppForm control={control} registerAction={register} />
            )}
            {block === "home_payments" && (
                <HomePaymentsForm control={control} registerAction={register} />
            )}
            {block === "home_registration_guide" && (
                <HomeRegistrationGuideForm control={control} registerAction={register} />
            )}
            {block === "home_sports" && (
                <HomeSportsForm control={control} registerAction={register} />
            )}
            {block === "home_support" && (
                <HomeSupportForm control={control} registerAction={register} />
            )}
            {block === "home_top_feature" && (
                <HomeTopFeatureForm control={control} registerAction={register} />
            )}
            {block === "home_verification" && (
                <HomeVerificationForm
                    registerAction={register}
                    errors={(control)?._formState?.errors} />
            )}

            {block === "responsiblegame_about_primary" && (
                <ResponsibleGameAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "slots_about_primary" && (
                <SlotsAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "slots_casino" && (
                <SlotsCasinoForm
                    control={control}
                    registerAction={register}
                />
            )}
            {block === "slots_hero" && <SlotsHeroForm registerAction={register}/>}

            {block === "slots_aviator_about_primary" && (
                <SlotsAviatorAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "slots_bookofdead_about_primary" && (
                <SlotsBookOfDeadAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "slots_bookofradeluxe_about_primary" && (
                <SlotsBookOfRaDeluxeAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "slots_chickenroad_about_primary" && (
                <SlotsChickenRoadAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

                {block === "slots_fruitcocktail_about_primary" && (
                    <SlotsFruitCocktailAboutPrimaryForm
                        control={control}
                        registerAction={register}
                        setValue={setValue}
                    />
                )}

            {block === "slots_plinko_about_primary" && (
                <SlotsPlinkoAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "slots_popular_about_primary" && (
                <SlotsPopularAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "slots_popular_casino" && (
                <SlotsPopularCasinoForm
                    control={control}
                    registerAction={register}
                />
            )}

            {block === "sportsbook_about_primary" && (
                <SportsbookAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}
            {block === "sportsbook_hero" && (
                <SportsbookHeroForm registerAction={register}/>
            )}

            {block === "sportsbook_basketball_about_primary" && (
                <SportsbookBasketballAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "sportsbook_football_about_primary" && (
                <SportsbookFootballAboutPrimaryForm
                    control={control}
                    registerAction={register}
                    setValue={setValue}
                />
            )}

            {block === "seo_seo" && (
                <SeoForm
                    control={control}
                    registerAction={register}
                    setValue={form.setValue}
                />
            )}
            </div>

            {/* Футер з діями (липкий) */}
            <div
                className="sticky bottom-0 z-10 border-t border-slate-200/70 bg-white/90 backdrop-blur
                   px-6 py-4 flex justify-end gap-3
                   dark:bg-[#0f172a]/90 dark:border-white/10"
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-slate-300/70 px-4 py-2 text-sm font-medium
                     hover:bg-slate-50 active:scale-[0.99] transition
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
                     dark:border-white/15 dark:hover:bg-white/5 dark:ring-offset-[#0f172a]"
                >
                    Скасувати
                </button>

                <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow
                     hover:from-sky-500 hover:to-sky-400 active:scale-[0.99] transition
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2
                     dark:ring-offset-[#0f172a]"
                >
                    Зберегти блок
                </button>
            </div>
        </form>
    );
}