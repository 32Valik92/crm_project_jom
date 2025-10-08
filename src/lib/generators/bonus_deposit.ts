// src/lib/generators/bonus_deposit.ts
export function indexForBonusDeposit() {
    return `import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";

export default {
  bonus_deposit_page: {
    about_primary,
    bonuses,
  },
} as const;
`;
}
