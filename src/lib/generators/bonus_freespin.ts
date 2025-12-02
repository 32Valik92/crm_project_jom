export function indexForBonusFreespin() {
    return `import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";

export default {
  bonus_freespin_page: {
    about_primary,
    bonuses,
  },
} as const;
`;
}
