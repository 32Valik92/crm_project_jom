/** Генератор index.ts для папки /app */
export function indexForApp() {
    return `import about_primary from "./about_primary.json";
import mobile_app from "./mobile_app.json";

export default {
  app_page: {
    about_primary,
    mobile_app,
  },
} as const;
`;
}
