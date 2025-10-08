/** Генератор index.ts для папки /bonus_cashback */
export function indexForBonusCashback() {
    return `import about_primary from "./about_primary.json";

export default {
  bonus_cashback_page: {
    about_primary,
  },
} as const;
`;
}
