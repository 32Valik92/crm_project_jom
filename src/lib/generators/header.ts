// src/lib/generators/header.ts
export function indexForHeader() {
    return `import header from "./header.json";

export default {
  header,
} as const;
`;
}
