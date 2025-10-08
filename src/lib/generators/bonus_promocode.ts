// src/lib/generators/bonus_promocode.ts
export function indexForBonusPromocode() {
    return `import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";

export default {
  bonus_promocode_page: {
    about_primary,
    bonuses,
  },
} as const;
`;
}
