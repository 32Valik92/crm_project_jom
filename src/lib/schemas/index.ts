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
    | import("./bonus_freebet/bonuses").BonusFreebetBonuses;
