// src/lib/generators/contacts.ts
export function indexForContacts() {
    return `import about_primary from "./about_primary.json";
import about_secondary from "./about_secondary.json";

export default {
  contacts_page: {
    about_primary,
    about_secondary,
  },
} as const;
`;
}
