export function indexForSlotsPopular() {
    return `import about_primary from "./about_primary.json";
import casino from "./casino.json";

export default {
  slots_popular_page: {
    about_primary,
    casino,
  },
} as const;
`;
}
