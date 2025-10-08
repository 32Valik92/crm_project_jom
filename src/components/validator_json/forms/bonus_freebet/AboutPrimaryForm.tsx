// src/components/validator_json/forms/bonus_freebet/AboutPrimaryForm.tsx
"use client";

import { useEffect, useRef } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function BonusFreebetAboutPrimaryForm({
                                                         control,
                                                         registerAction,
                                                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const blocksFA = useFieldArray({ control, name: "blocks" as any });
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        if (blocksFA.fields.length === 0) {
            blocksFA.append({ title: "", imageHero: "", intro: "", items: [] });
        }
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocksFA.append]);

    return (
        <div className="space-y-[12px]">
            {blocksFA.fields.map((f, idx) => (
                <BlockEditor
                    key={f.id}
                    control={control}
                    registerAction={registerAction}
                    idx={idx}
                    onRemove={() => blocksFA.remove(idx)}
                />
            ))}
            <button
                type="button"
                className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                onClick={() => blocksFA.append({ title: "", imageHero: "", intro: "", items: [] })}
            >
                Додати блок
            </button>
        </div>
    );
}

function BlockEditor({
                         control,
                         registerAction,
                         idx,
                         onRemove,
                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    idx: number;
    onRemove: () => void;
}) {
    const itemsFA = useFieldArray({ control, name: `blocks.${idx}.items` as any });

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">blocks[{idx}].title</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`blocks.${idx}.title`)} />
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">blocks[{idx}].imageHero</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`blocks.${idx}.imageHero`)} />
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">blocks[{idx}].intro</span>
                <textarea className="rounded-[4px] border p-[8px]" rows={4} {...registerAction(`blocks.${idx}.intro`)} />
            </label>

            <div className="space-y-[8px]">
                <div className="text-[12px] leading-[16px] font-medium">blocks[{idx}].items</div>
                {itemsFA.fields.map((it, iIdx) => (
                    <div key={it.id} className="flex items-center gap-[8px]">
                        <input
                            className="w-full rounded-[4px] border p-[8px]"
                            placeholder="item"
                            {...registerAction(`blocks.${idx}.items.${iIdx}`)}
                        />
                        <button
                            type="button"
                            className="text-[12px] leading-[16px] underline"
                            onClick={() => itemsFA.remove(iIdx)}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => itemsFA.append("")}
                >
                    Додати item
                </button>
            </div>

            <button
                type="button"
                className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                onClick={onRemove}
            >
                Видалити блок
            </button>
        </div>
    );
}
