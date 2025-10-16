// src/components/validator_json/forms/home/SupportForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeSupportForm({
                                            control,
                                            registerAction,
                                        }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const itemsFA = useFieldArray({ control, name: "items" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (itemsFA.fields.length === 0) {
            itemsFA.append({ icon: "", label: "", value: "", badge: "" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (p: string) => p.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (bad: boolean) =>
        ["rounded-[4px] border p-[8px] w-full", bad ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[16px]">
            {/* title */}
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">
            {String(err("title")?.message)}
          </span>
                )}
            </div>

            {/* items */}
            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">items</div>

                {itemsFA.fields.map((row, rIdx) => {
                    const base = `items.${rIdx}`;
                    return (
                        <div key={row.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
                            <div className="grid md:grid-cols-5 gap-[8px]">
                                <div className="md:col-span-2 flex flex-col gap-[4px]">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.icon</span>
                                    <input className={cls(!!err(`${base}.icon`))} {...registerAction(`${base}.icon`)} />
                                    {!!err(`${base}.icon`) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(`${base}.icon`)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="md:col-span-1 flex flex-col gap-[4px]">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.label</span>
                                    <input className={cls(!!err(`${base}.label`))} {...registerAction(`${base}.label`)} />
                                    {!!err(`${base}.label`) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(`${base}.label`)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="md:col-span-2 flex flex-col gap-[4px]">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.value</span>
                                    <input className={cls(!!err(`${base}.value`))} {...registerAction(`${base}.value`)} />
                                    {!!err(`${base}.value`) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(`${base}.value`)?.message)}
                    </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-5 gap-[8px]">
                                <div className="md:col-span-4 flex flex-col gap-[4px]">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.badge (optional)</span>
                                    <input className={cls(!!err(`${base}.badge`))} {...registerAction(`${base}.badge`)} />
                                </div>

                                <div className="md:col-span-1 flex items-end">
                                    <button
                                        type="button"
                                        className="text-[12px] leading-[16px] underline"
                                        onClick={() => itemsFA.remove(rIdx)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => itemsFA.append({ icon: "", label: "", value: "", badge: "" })}
                >
                    Додати пункт
                </button>
            </div>
        </div>
    );
}
