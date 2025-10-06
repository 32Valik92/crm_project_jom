export { indexForAbout } from "./about";
export { indexForApp } from "./app";

/** Генератор кореневого index.ts у локалі */
export function rootIndex(hasAbout: boolean, hasApp: boolean) {
    const lines: string[] = [];
    if (hasAbout) lines.push("export { default as about } from './about';");
    if (hasApp) lines.push("export { default as app } from './app';");
    return lines.join("\n") + (lines.length ? "\n" : "");
}
