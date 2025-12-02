export function indexForAbout() {
    return `import about_primary from "./about_primary.json";

export default {
  about_page: {
    about_primary,
  },
} as const;
`;
}
