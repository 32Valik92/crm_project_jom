export function indexForContacts() {
    return `import about_primary from "./about_primary.json";

export default {
  contacts_page: {
    about_primary,
  },
} as const;
`;
}
