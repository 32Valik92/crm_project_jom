"use client";

import { useEffect, useRef } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function BonusCashbackAboutPrimaryForm({
                                                          control,
                                                          registerAction,
                                                      }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const blocksFA = useFieldArray({ control, name: "blocks" as any });

    // Ініціалізуємо ПЕРШИЙ блок лише раз після монтування (без оновлення під час render)
    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current) return;
        if (blocksFA.fields.length === 0) {
            blocksFA.append({ title: "", imageHero: "", intro: "" });
        }
        didInit.current = true;
        // dependency на append стабільна; не додаємо fields, щоб не тригерити повторно
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blocksFA.append]);

    return (
        <div className="space-y-[12px]">
            {blocksFA.fields.map((f, idx) => (
                <div key={f.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
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

                    <button
                        type="button"
                        className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                        onClick={() => blocksFA.remove(idx)}
                    >
                        Видалити блок
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                onClick={() => blocksFA.append({ title: "", imageHero: "", intro: "" })}
            >
                Додати блок
            </button>
        </div>
    );
}
