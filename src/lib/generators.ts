import type { PageKey } from "./schemas";

export function indexForAbout() {
    return `import about_primary from "./about_primary.json;"

export default {
    about_page: {
        about_primary,
    },
} as const;
`;
}

export function indexForApp() {
    return `import about_primary from "./about_primary.json;"
import mobile_app from "./mobile_app.json"

export default {
    app_page: {
        about_primary,
        mobile_app,
    },
} as const;
`;
}

export function rootIndex(hasAbout: boolean, hasApp: boolean) {
    const lines: string[] = [];
    if (hasAbout) lines.push("export { default as about } from './about';");
    if (hasApp) lines.push("export { default as app } from './app';");
    return lines.join("\n") + (lines.length ? "\n" : "");
}

export function folderNameFor(page: PageKey) {
    return page;
}
