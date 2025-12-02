export function indexForSlots() {
    return `import about_primary from "./about_primary.json";
import casino from "./casino.json";
import hero from "./hero.json";

export default {
  slots_page: {
    about_primary,
    casino,
    hero,
  },
} as const;
`;
}
