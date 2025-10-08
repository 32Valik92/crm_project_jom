// src/components/validator_json/forms/contacts/AboutSecondaryForm.tsx
"use client";

import { useEffect, useRef } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function ContactsAboutSecondaryForm({
                                                       control, registerAction,
                                                   }: { control: Control; registerAction: UseFormRegister<any>; }) {
    const sectionsFA = useFieldArray({ control, name: "sections" as any });
    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current) return;
        if (sectionsFA.fields.length === 0) sectionsFA.append({ kind: "ordered", title: "", intro: "", items: [""] });
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionsFA.append]);

    return (
        <div className="space-y-[12px]">
            <ImageBlock registerAction={registerAction} baseName="image" />

            <div className="space-y-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">sections</div>
                {sectionsFA.fields.map((f, idx) => (
                    <SectionEditor
                        key={f.id}
                        control={control}
                        registerAction={registerAction}
                        idx={idx}
                        onRemove={() => sectionsFA.remove(idx)}
                    />
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                        onClick={() => sectionsFA.append({ kind: "ordered", title: "", intro: "", items: [""] })}>
                    Додати section
                </button>
            </div>
        </div>
    );
}

function ImageBlock({ registerAction, baseName }: { registerAction: UseFormRegister<any>; baseName: string }) {
    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">{baseName}.alt</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`${baseName}.alt`)} />
            </label>
            {["desktop", "mobile"].map((v) => (
                <div key={v} className="grid md:grid-cols-2 gap-[8px]">
                    <input className="rounded-[4px] border p-[8px]" placeholder={`${v}.src`} {...registerAction(`${baseName}.${v}.src`)} />
                    <input className="rounded-[4px] border p-[8px]" placeholder={`${v}.height`} type="number" {...registerAction(`${baseName}.${v}.height`)} />
                </div>
            ))}
        </div>
    );
}

function SectionEditor({
                           control, registerAction, idx, onRemove,
                       }: { control: Control; registerAction: UseFormRegister<any>; idx: number; onRemove: () => void; }) {
    const itemsFA = useFieldArray({ control, name: `sections.${idx}.items` as any });
    useEffect(() => { if (itemsFA.fields.length === 0) itemsFA.append(""); /* eslint-disable-next-line */ }, [idx]);

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <div className="grid md:grid-cols-2 gap-[8px]">
                <select className="rounded-[4px] border p-[8px]" {...registerAction(`sections.${idx}.kind`)}>
                    <option value="ordered">ordered</option>
                    <option value="unordered">unordered</option>
                </select>
                <input className="rounded-[4px] border p-[8px]" placeholder="title" {...registerAction(`sections.${idx}.title`)} />
            </div>
            <textarea className="rounded-[4px] border p-[8px]" rows={3} placeholder="intro" {...registerAction(`sections.${idx}.intro`)} />
            <div className="space-y-[8px]">
                <div className="text-[12px] leading-[16px] font-medium">items</div>
                {itemsFA.fields.map((it, iIdx) => (
                    <div key={it.id} className="flex items-center gap-[8px]">
                        <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`sections.${idx}.items.${iIdx}`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => itemsFA.remove(iIdx)}>×</button>
                    </div>
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => itemsFA.append("")}>
                    Додати item
                </button>
            </div>
            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={onRemove}>
                Видалити section
            </button>
        </div>
    );
}
