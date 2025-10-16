// src/lib/schemas/catalog.ts (додай)
export type PageKey =
    | "about" | "app"
    | "bonus" | "bonus_cashback" | "bonus_deposit" | "bonus_freebet" | "bonus_freespin" | "bonus_promocode"
    | "contacts" | "faq" | "footer" | "header"
    | "slots_aviator" | "responsiblegame" | "slots" | "slots_bookofdead"
    | "slots_bookofradeluxe" | "slots_chickenroad" | "slots_fruitcocktail" | "slots_plinko"
    | "slots_popular" | "sportsbook" | "sportsbook_basketball" | "sportsbook_football"
    | "home"
    | "seo";

export type BlockKey =
    | "about_primary" | "app_about_primary" | "mobile_app"
    | "bonus_about_primary" | "bonus_bonuses" | "bonus_hero"
    | "bonus_cashback_about_primary"
    | "bonus_deposit_about_primary" | "bonus_deposit_bonuses"
    | "bonus_freebet_about_primary" | "bonus_freebet_bonuses"
    | "bonus_freespin_about_primary" | "bonus_freespin_bonuses"
    | "bonus_promocode_about_primary" | "bonus_promocode_bonuses"
    | "contacts_about_primary"
    | "faq_about_primary"
    | "footer_footer"
    | "header_header"
    | "slots_aviator_about_primary" | "responsiblegame_about_primary"
    | "slots_about_primary"
    | "slots_casino"
    | "slots_hero"
    | "slots_bookofdead_about_primary"
    | "slots_bookofradeluxe_about_primary"
    | "slots_chickenroad_about_primary"
    | "slots_fruitcocktail_about_primary"
    | "slots_plinko_about_primary"
    | "slots_popular_about_primary" | "slots_popular_casino"
    | "sportsbook_about_primary" | "sportsbook_hero"
    | "sportsbook_basketball_about_primary"
    | "sportsbook_football_about_primary"
    | "home_about"
    | "home_about_primary"
    | "home_bonuses"
    | "home_casino"
    | "home_faq"
    | "home_feature_cards"
    | "home_hero"
    | "home_how_to_start"
    | "home_mobile_app"
    | "home_payments"
    | "home_registration_guide"
    | "home_sports"
    | "home_support"
    | "home_top_feature"
    | "home_verification"
    | "seo_seo";

export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    about: {label: "About page", blocks: ["about_primary"]},
    app: {label: "App page", blocks: ["app_about_primary", "mobile_app"]},
    bonus: {label: "Bonus page", blocks: ["bonus_about_primary", "bonus_bonuses", "bonus_hero"]},
    bonus_cashback: {label: "Bonus Cashback page", blocks: ["bonus_cashback_about_primary"]},
    bonus_deposit: {label: "Bonus Deposit page", blocks: ["bonus_deposit_about_primary", "bonus_deposit_bonuses"]},
    bonus_freebet: {label: "Bonus Freebet page", blocks: ["bonus_freebet_about_primary", "bonus_freebet_bonuses"]},
    bonus_freespin: {label: "Bonus Freespin page", blocks: ["bonus_freespin_about_primary", "bonus_freespin_bonuses"]},
    bonus_promocode: {
        label: "Bonus Promocode page",
        blocks: ["bonus_promocode_about_primary", "bonus_promocode_bonuses"]
    },
    contacts: {label: "Contacts page", blocks: ["contacts_about_primary"]},
    faq: {label: "FAQ page", blocks: ["faq_about_primary"]},
    footer: {label: "Footer", blocks: ["footer_footer"]},
    header: {label: "Header", blocks: ["header_header"]},
    responsiblegame: {label: "Responsible Game page", blocks: ["responsiblegame_about_primary"]},
    slots: {label: "Slots page", blocks: ["slots_about_primary", "slots_casino", "slots_hero"]},
    slots_aviator: {label: "Slots Aviator page", blocks: ["slots_aviator_about_primary"]},
    slots_bookofdead: {label: "Slots / Book of Dead", blocks: ["slots_bookofdead_about_primary"]},
    slots_bookofradeluxe: {label: "Slots / Book of Ra Deluxe", blocks: ["slots_bookofradeluxe_about_primary"]},
    slots_chickenroad: {label: "Slots / Chicken Road", blocks: ["slots_chickenroad_about_primary"]},
    slots_fruitcocktail: {label: "Slots / Fruit Cocktail", blocks: ["slots_fruitcocktail_about_primary"]},
    slots_plinko: {label: "Slots / Plinko", blocks: ["slots_plinko_about_primary"]},
    slots_popular: {label: "Slots / Popular", blocks: ["slots_popular_about_primary", "slots_popular_casino"]},
    sportsbook: {label: "Sportsbook", blocks: ["sportsbook_about_primary", "sportsbook_hero"]},
    sportsbook_basketball: {label: "Sportsbook / Basketball", blocks: ["sportsbook_basketball_about_primary"]},
    sportsbook_football: {label: "Sportsbook / Football", blocks: ["sportsbook_football_about_primary"]},

    home: {
        label: "Home page",
        blocks: [
            "home_about",
            "home_about_primary",
            "home_bonuses",
            "home_casino",
            "home_faq",
            "home_feature_cards",
            "home_hero",
            "home_how_to_start",
            "home_mobile_app",
            "home_payments",
            "home_registration_guide",
            "home_sports",
            "home_support",
            "home_top_feature",
            "home_verification",
        ],
    },

    seo: { label: "SEO", blocks: ["seo_seo"] },


};

export const BLOCK_META: Record<BlockKey, { label: string; file: string }> = {
    about_primary: {label: "About / Primary", file: "about_primary.json"},
    app_about_primary: {label: "App / Primary", file: "about_primary.json"},
    mobile_app: {label: "App / Mobile App", file: "mobile_app.json"},
    bonus_about_primary: {label: "Bonus / About Primary", file: "about_primary.json"},
    bonus_bonuses: {label: "Bonus / Bonuses", file: "bonuses.json"},
    bonus_hero: {label: "Bonus / Hero", file: "hero.json"},
    bonus_cashback_about_primary: {label: "Bonus Cashback / About Primary", file: "about_primary.json"},
    bonus_deposit_about_primary: {label: "Bonus Deposit / About Primary", file: "about_primary.json"},
    bonus_deposit_bonuses: {label: "Bonus Deposit / Bonuses", file: "bonuses.json"},
    bonus_freebet_about_primary: {label: "Bonus Freebet / About Primary", file: "about_primary.json"},
    bonus_freebet_bonuses: {label: "Bonus Freebet / Bonuses", file: "bonuses.json"},
    bonus_freespin_about_primary: {label: "Bonus Freespin / About Primary", file: "about_primary.json"},
    bonus_freespin_bonuses: {label: "Bonus Freespin / Bonuses", file: "bonuses.json"},
    bonus_promocode_about_primary: {label: "Bonus Promocode / About Primary", file: "about_primary.json"},
    bonus_promocode_bonuses: {label: "Bonus Promocode / Bonuses", file: "bonuses.json"},
    contacts_about_primary: {label: "Contacts / About Primary", file: "about_primary.json"},
    faq_about_primary: {label: "FAQ / About Primary", file: "about_primary.json"},
    footer_footer: {label: "Footer / Data", file: "footer.json"},
    header_header: {label: "Header / Data", file: "header.json"},
    responsiblegame_about_primary: {label: "Responsible Game / About Primary", file: "about_primary.json"},
    slots_about_primary: {label: "Slots / About Primary", file: "about_primary.json"},
    slots_casino: {label: "Slots / Casino", file: "casino.json"},
    slots_hero: {label: "Slots / Hero", file: "hero.json"},
    slots_aviator_about_primary: {label: "Slots Aviator / About Primary", file: "about_primary.json"},
    slots_bookofdead_about_primary: {label: "Slots Book of Dead / About Primary", file: "about_primary.json"},
    slots_bookofradeluxe_about_primary: {label: "Slots Book of Ra Deluxe / About Primary", file: "about_primary.json"},
    slots_chickenroad_about_primary: {label: "Slots Chicken Road / About Primary", file: "about_primary.json"},
    slots_fruitcocktail_about_primary: {label: "Slots Fruit Cocktail / About Primary", file: "about_primary.json"},
    slots_plinko_about_primary: {label: "Slots Plinko / About Primary", file: "about_primary.json"},
    slots_popular_about_primary: {label: "Slots Popular / About Primary", file: "about_primary.json"},
    slots_popular_casino: {label: "Slots Popular / Casino", file: "casino.json"},
    sportsbook_about_primary: {label: "Sportsbook / About Primary", file: "about_primary.json"},
    sportsbook_hero: {label: "Sportsbook / Hero", file: "hero.json"},
    sportsbook_basketball_about_primary: {label: "Sportsbook Basketball / About Primary", file: "about_primary.json"},
    sportsbook_football_about_primary: {label: "Sportsbook Football / About Primary", file: "about_primary.json"},

    home_about: {label: "Home / About", file: "about.json"},
    home_about_primary: {label: "Home / About Primary", file: "about_primary.json"},
    home_bonuses: {label: "Home / Bonuses", file: "bonuses.json"},
    home_casino: {label: "Home / Casino", file: "casino.json"},
    home_faq: {label: "Home / FAQ", file: "faq.json"},
    home_feature_cards: {label: "Home / Feature Cards", file: "feature_cards.json"},
    home_hero: {label: "Home / Hero", file: "hero.json"},
    home_how_to_start: {label: "Home / How To Start", file: "how_to_start.json"},
    home_mobile_app: {label: "Home / Mobile App", file: "mobile_app.json"},
    home_payments: {label: "Home / Payments", file: "payments.json"},
    home_registration_guide: {label: "Home / Registration Guide", file: "registration_guide.json"},
    home_sports: {label: "Home / Sports", file: "sports.json"},
    home_support: {label: "Home / Support", file: "support.json"},
    home_top_feature: {label: "Home / Top Feature", file: "top_feature.json"},
    home_verification: {label: "Home / Verification", file: "verification.json"},

    seo_seo: { label: "SEO / Entries", file: "seo.json" },

};
