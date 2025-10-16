// src/components/validator_json/forms/home/AboutForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeAboutForm({
                                          control,
                                          registerAction,
                                      }: { control: Control; registerAction: UseFormRegister<any> }) {
    const leadFA = useFieldArray({ control, name: "lead" as any });
    const rowsFA = useFieldArray({ control, name: "info.rows" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (leadFA.fields.length === 0) leadFA.append("");
        if (rowsFA.fields.length === 0) rowsFA.append({ label: "", value: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (path: string) => path.split(".").reduce((a,k)=> (a?a[k]:undefined), errors);
    const cls = (has:boolean) => ["rounded-[4px] border p-[8px] w-full", has ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[12px]">
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("title")?.message)}</span>}
            </div>

            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">lead</div>
                {leadFA.fields.map((f, i) => {
                    const path = `lead.${i}`;
                    const has = !!err(path);
                    return (
                        <div key={f.id} className="flex items-center gap-[8px]">
                            <textarea className={cls(has)} rows={3} {...registerAction(path)} />
                            <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => leadFA.remove(i)}>×</button>
                        </div>
                    );
                })}
                {!!err("lead")?.message && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("lead")?.message)}</span>}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => leadFA.append("")}>
                    Додати пункт
                </button>
            </div>

            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">info</div>

                <div className="flex flex-col gap-[4px]">
                    <span className="text-[12px] leading-[16px] text-[#525252]">info.heading</span>
                    <input className={cls(!!err("info.heading"))} {...registerAction("info.heading")} />
                    {!!err("info")?.heading && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("info")?.heading?.message)}</span>}
                </div>

                <div className="space-y-[8px]">
                    <div className="text-[12px] leading-[16px] font-medium">info.rows</div>
                    {rowsFA.fields.map((r, i) => {
                        const lp = `info.rows.${i}.label`;
                        const vp = `info.rows.${i}.value`;
                        const lHas = !!err(lp);
                        const vHas = !!err(vp);
                        return (
                            <div key={r.id} className="grid md:grid-cols-2 gap-[8px]">
                                <input className={cls(lHas)} placeholder="label" {...registerAction(lp)} />
                                <div className="flex items-center gap-[8px]">
                                    <input className={cls(vHas)} placeholder="value" {...registerAction(vp)} />
                                    <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => rowsFA.remove(i)}>×</button>
                                </div>
                            </div>
                        );
                    })}
                    {!!err("info")?.rows?.message && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("info")?.rows?.message)}</span>}
                    <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => rowsFA.append({ label: "", value: "" })}>
                        Додати рядок
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">safety</span>
                <textarea className={cls(!!err("safety"))} rows={3} {...registerAction("safety")} />
                {!!err("safety") && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("safety")?.message)}</span>}
            </div>
        </div>
    );
}
