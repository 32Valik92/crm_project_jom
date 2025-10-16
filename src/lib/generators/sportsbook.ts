// src/lib/generators/sportsbook.ts
export function indexForSportsbook() {
    return `import about_primary from "./about_primary.json";
import hero from "./hero.json";

export default {
  sportsbook_page: {
    about_primary,
    hero,
  },
} as const;
`;
}
