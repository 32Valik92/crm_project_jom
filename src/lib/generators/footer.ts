// src/lib/generators/footer.ts
export function indexForFooter() {
    return `import footer from "./footer.json";

export default {
  footer,
} as const;
`;
}
