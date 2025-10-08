// src/components/validator_json/forms/footer/FooterForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function FooterForm({
                                       control, registerAction,
                                   }: { control: Control; registerAction: UseFormRegister<any>; }) {
    const columnsFA = useFieldArray({ control, name: "columns" as any });

    useEffect(() => {
        if (columnsFA.fields.length === 0) columnsFA.append({ links: [{ label: "", href: "" }] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">tagline</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("tagline")} />
            </label>

            <div className="rounded-[6px] border p-[12px] space-y-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">columns</div>
                {columnsFA.fields.map((col, cIdx) => (
                    <ColumnEditor
                        key={col.id}
                        control={control}
                        registerAction={registerAction}
                        cIdx={cIdx}
                        onRemove={() => columnsFA.remove(cIdx)}
                    />
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => columnsFA.append({ links: [{ label: "", href: "" }] })}>
                    Додати колонку
                </button>
            </div>

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">bottom</div>
                <input className="rounded-[4px] border p-[8px]" placeholder="copyright" {...registerAction("bottom.copyright")} />
            </div>
        </div>
    );
}

function ColumnEditor({
                          control, registerAction, cIdx, onRemove,
                      }: { control: Control; registerAction: UseFormRegister<any>; cIdx: number; onRemove: () => void; }) {
    const linksFA = useFieldArray({ control, name: `columns.${cIdx}.links` as any });

    useEffect(() => {
        if (linksFA.fields.length === 0) linksFA.append({ label: "", href: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cIdx]);

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <div className="text-[12px] leading-[16px] font-medium">columns[{cIdx}].links</div>
            {linksFA.fields.map((l, iIdx) => (
                <div key={l.id} className="grid md:grid-cols-2 gap-[8px]">
                    <input className="rounded-[4px] border p-[8px]" placeholder="label" {...registerAction(`columns.${cIdx}.links.${iIdx}.label`)} />
                    <div className="flex items-center gap-[8px]">
                        <input className="w-full rounded-[4px] border p-[8px]" placeholder="href" {...registerAction(`columns.${cIdx}.links.${iIdx}.href`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => linksFA.remove(iIdx)}>×</button>
                    </div>
                </div>
            ))}
            <div className="flex items-center gap-[8px]">
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => linksFA.append({ label: "", href: "" })}>
                    Додати link
                </button>
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={onRemove}>
                    Видалити колонку
                </button>
            </div>
        </div>
    );
}
