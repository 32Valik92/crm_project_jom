// src/lib/generators/sportsbook_football.ts
export function indexForSportsbookFootball() {
    return `import about_primary from "./about_primary.json";

export default {
  sportsbook_football_page: {
    about_primary,
  },
} as const;
`;
}
