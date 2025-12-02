export function indexForFaq() {
    return `import about_primary from "./about_primary.json";

export default {
  faq_page: {
    about_primary,
  },
} as const;
`;
}
