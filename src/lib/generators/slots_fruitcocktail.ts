// src/lib/generators/slots_fruitcocktail.ts
export function indexForSlotsFruitCocktail() {
    return `import about_primary from "./about_primary.json";

export default {
  slots_fruitcocktail_page: {
    about_primary,
  },
} as const;
`;
}
