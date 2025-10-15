// src/lib/generators/responsiblegame.ts
export function indexForResponsibleGame() {
    return `import about_primary from "./about_primary.json";

export default {
  responsiblegame_page: {
    about_primary,
  },
} as const;
`;
}
