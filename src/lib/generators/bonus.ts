export function indexForBonus() {
    return `import about_primary from "./about_primary.json";
import bonuses from "./bonuses.json";
import hero from "./hero.json";

export default {
  bonus_page: {
    about_primary,
    bonuses,
    hero,
  },
} as const;
`;
}
