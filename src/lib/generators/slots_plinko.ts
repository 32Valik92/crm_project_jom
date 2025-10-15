// src/lib/generators/slots_plinko.ts
export function indexForSlotsPlinko() {
    return `import about_primary from "./about_primary.json";

export default {
  slots_plinko_page: {
    about_primary,
  },
} as const;
`;
}
