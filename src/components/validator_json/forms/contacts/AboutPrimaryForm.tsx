// src/components/validator_json/forms/contacts/AboutPrimaryForm.tsx
"use client";

import { useEffect, useRef } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function ContactsAboutPrimaryForm({
                                                     control,
                                                     registerAction,
                                                 }: { control: Control; registerAction: UseFormRegister<any>; }) {
    const sectionsFA = useFieldArray({ control, name: "sections" as any });
    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current) return;
        if (sectionsFA.fields.length === 0) sectionsFA.append({ kind: "paragraphs", title: "", items: [""], cta: undefined });
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionsFA.append]);

    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("title")} />
            </label>

            <Lead control={control} registerAction={registerAction} />

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
                        onClick={() => sectionsFA.append({ kind: "paragraphs", title: "", items: [""] })}>
                    Додати section
                </button>
            </div>
        </div>
    );
}

function Lead({ control, registerAction }: { control: Control; registerAction: UseFormRegister<any> }) {
    const fa = useFieldArray({ control, name: "lead" as any });
    useEffect(() => { if (fa.fields.length === 0) fa.append(""); /* eslint-disable-next-line */ }, []);
    return (
        <div className="space-y-[8px]">
            <div className="text-[14px] leading-[20px] font-medium">lead</div>
            {fa.fields.map((f, idx) => (
                <div key={f.id} className="flex items-center gap-[8px]">
                    <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`lead.${idx}`)} />
                    <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => fa.remove(idx)}>×</button>
                </div>
            ))}
            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => fa.append("")}>
                Додати lead
            </button>
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
                    <option value="paragraphs">paragraphs</option>
                </select>
                <input className="rounded-[4px] border p-[8px]" placeholder="title" {...registerAction(`sections.${idx}.title`)} />
            </div>

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

            <div className="grid md:grid-cols-2 gap-[8px]">
                <input className="rounded-[4px] border p-[8px]" placeholder="cta.label" {...registerAction(`sections.${idx}.cta.label`)} />
                <input className="rounded-[4px] border p-[8px]" placeholder="cta.href" {...registerAction(`sections.${idx}.cta.href`)} />
            </div>

            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={onRemove}>
                Видалити section
            </button>
        </div>
    );
}
