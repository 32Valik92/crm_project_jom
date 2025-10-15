// src/lib/schemas/index.ts
export { PAGES, BLOCK_META } from "./catalog";
export type { PageKey, BlockKey } from "./catalog";

export { about_primary_schema } from "./about/about_primary";
export type { AboutPrimary } from "./about/about_primary";

export { app_about_primary_schema } from "./app/about_primary";
export type { AppAboutPrimary } from "./app/about_primary";

export { app_mobile_app_schema } from "./app/mobile_app";
export type { AppMobileApp } from "./app/mobile_app";

export { bonus_about_primary_schema } from "./bonus/about_primary";
export type { BonusAboutPrimary } from "./bonus/about_primary";
export { bonus_bonuses_schema } from "./bonus/bonuses";
export type { BonusBonuses } from "./bonus/bonuses";

export { bonus_hero_schema } from "./bonus/hero";
export type { BonusHero } from "./bonus/hero";

export { bonus_cashback_about_primary_schema } from "./bonus_cashback/about_primary";
export type { BonusCashbackAboutPrimary } from "./bonus_cashback/about_primary";

export { bonus_deposit_about_primary_schema } from "./bonus_deposit/about_primary";
export type { BonusDepositAboutPrimary } from "./bonus_deposit/about_primary";
export { bonus_deposit_bonuses_schema } from "./bonus_deposit/bonuses";
export type { BonusDepositBonuses } from "./bonus_deposit/bonuses";

export { bonus_freebet_about_primary_schema } from "./bonus_freebet/about_primary";
export type { BonusFreebetAboutPrimary } from "./bonus_freebet/about_primary";
export { bonus_freebet_bonuses_schema } from "./bonus_freebet/bonuses";
export type { BonusFreebetBonuses } from "./bonus_freebet/bonuses";

export { bonus_freespin_about_primary_schema } from "./bonus_freespin/about_primary";
export type { BonusFreespinAboutPrimary } from "./bonus_freespin/about_primary";
export { bonus_freespin_bonuses_schema } from "./bonus_freespin/bonuses";
export type { BonusFreespinBonuses } from "./bonus_freespin/bonuses";

export { bonus_promocode_about_primary_schema } from "./bonus_promocode/about_primary";
export type { BonusPromocodeAboutPrimary } from "./bonus_promocode/about_primary";
export { bonus_promocode_bonuses_schema } from "./bonus_promocode/bonuses";
export type { BonusPromocodeBonuses } from "./bonus_promocode/bonuses";

export { contacts_about_primary_schema } from "./contacts/about_primary";
export type { ContactsAboutPrimary } from "./contacts/about_primary";
export { contacts_about_secondary_schema } from "./contacts/about_secondary";
export type { ContactsAboutSecondary } from "./contacts/about_secondary";

export { faq_about_primary_schema } from "./faq/about_primary";
export type { FaqAboutPrimary } from "./faq/about_primary";

export { footer_schema } from "./footer/footer";
export type { FooterData } from "./footer/footer";

export { header_schema } from "./header/header";
export type { HeaderData } from "./header/header";

export const BLOCK_SCHEMAS = {
    about_primary: require("./about/about_primary").about_primary_schema,

    app_about_primary: require("./app/about_primary").app_about_primary_schema,
    mobile_app: require("./app/mobile_app").app_mobile_app_schema,

    bonus_about_primary: require("./bonus/about_primary").bonus_about_primary_schema,
    bonus_bonuses: require("./bonus/bonuses").bonus_bonuses_schema,
    bonus_hero: require("./bonus/hero").bonus_hero_schema,

    bonus_cashback_about_primary: require("./bonus_cashback/about_primary").bonus_cashback_about_primary_schema,

    bonus_deposit_about_primary: require("./bonus_deposit/about_primary").bonus_deposit_about_primary_schema,
    bonus_deposit_bonuses: require("./bonus_deposit/bonuses").bonus_deposit_bonuses_schema,

    bonus_freebet_about_primary: require("./bonus_freebet/about_primary").bonus_freebet_about_primary_schema,
    bonus_freebet_bonuses: require("./bonus_freebet/bonuses").bonus_freebet_bonuses_schema,

    bonus_freespin_about_primary: require("./bonus_freespin/about_primary").bonus_freespin_about_primary_schema,
    bonus_freespin_bonuses: require("./bonus_freespin/bonuses").bonus_freespin_bonuses_schema,

    bonus_promocode_about_primary: require("./bonus_promocode/about_primary").bonus_promocode_about_primary_schema,
    bonus_promocode_bonuses: require("./bonus_promocode/bonuses").bonus_promocode_bonuses_schema,

    contacts_about_primary: require("./contacts/about_primary").contacts_about_primary_schema,
    contacts_about_secondary: require("./contacts/about_secondary").contacts_about_secondary_schema,

    faq_about_primary: require("./faq/about_primary").faq_about_primary_schema,

    footer_footer: require("./footer/footer").footer_schema,

    header_header: require("./header/header").header_schema,

    slots_aviator_about_primary: require("./slots_aviator/about_primary").slots_aviator_about_primary_schema,


} as const;

export type AnyBlockValue =
    | import("./about/about_primary").AboutPrimary
    | import("./app/about_primary").AppAboutPrimary
    | import("./app/mobile_app").AppMobileApp
    | import("./bonus/about_primary").BonusAboutPrimary
    | import("./bonus/bonuses").BonusBonuses
    | import("./bonus/hero").BonusHero
    | import("./bonus_cashback/about_primary").BonusCashbackAboutPrimary
    | import("./bonus_deposit/about_primary").BonusDepositAboutPrimary
    | import("./bonus_deposit/bonuses").BonusDepositBonuses
    | import("./bonus_freebet/about_primary").BonusFreebetAboutPrimary
    | import("./bonus_freebet/bonuses").BonusFreebetBonuses
    | import("./bonus_freespin/about_primary").BonusFreespinAboutPrimary
    | import("./bonus_freespin/bonuses").BonusFreespinBonuses
    | import("./bonus_promocode/about_primary").BonusPromocodeAboutPrimary
    | import("./bonus_promocode/bonuses").BonusPromocodeBonuses
    | import("./contacts/about_primary").ContactsAboutPrimary
    | import("./contacts/about_secondary").ContactsAboutSecondary
    | import("./faq/about_primary").FaqAboutPrimary
    | import("./footer/footer").FooterData
    | import("./header/header").HeaderData
    | import("./slots_aviator/about_primary").SlotsAviatorAboutPrimary;
