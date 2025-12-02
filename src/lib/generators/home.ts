export function indexForHome() {
    return `import about from "./about.json";
import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";
import casino from "./casino.json";
import faq from "./faq.json";
import feature_cards from "./feature_cards.json";
import hero from "./hero.json";
import how_to_start from "./how_to_start.json";
import mobile_app from "./mobile_app.json";
import payments from "./payments.json";
import registration_guide from "./registration_guide.json";
import sports from "./sports.json";
import support from "./support.json";
import top_feature from "./top_feature.json";
import verification from "./verification.json";

export default {
  home_page: {
    about,
    about_primary,
    bonuses,
    casino,
    faq,
    feature_cards,
    hero,
    how_to_start,
    mobile_app,
    payments,
    registration_guide,
    sports,
    support,
    top_feature,
    verification,
  },
} as const;
`;
}
