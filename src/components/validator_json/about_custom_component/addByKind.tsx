export function addByKind(append: (value: any) => void, kind: string) {
	const defaults: Record<string, any> = {
		title:     { kind: "title", h: 2, text: "" },
		paragraph: { kind: "paragraph", lines: [""] },
		image:     { kind: "image", alt: "", desktop: { src: "", height: 420 }, mobile: { src: "", height: 320 } },
		cta:       { kind: "cta", label: "", href: "" },
		unordered: { kind: "unordered", intro: "", items: [""] },
		ordered:   { kind: "ordered", intro: "", items: [""] },
	};

	const block = defaults[kind];
	if (block) append(block);
}
