// src/lib/generators/bonus_freebet.ts
export function indexForBonusFreebet() {
    return `import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";

export default {
  bonus_freebet_page: {
    about_primary,
    bonuses,
  },
} as const;
`;
}
