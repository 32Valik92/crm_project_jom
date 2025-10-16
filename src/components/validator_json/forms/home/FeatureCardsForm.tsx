// src/components/validator_json/forms/home/FeatureCardsForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeFeatureCardsForm({
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
            itemsFA.append({ icon: "", title: "", subtitle: "" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (path: string) =>
        path.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (has: boolean) =>
        ["rounded-[4px] border p-[8px] w-full", has ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[12px]">
            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">items</div>

                {itemsFA.fields.map((f, i) => {
                    const iconP = `items.${i}.icon`;
                    const titleP = `items.${i}.title`;
                    const subtP = `items.${i}.subtitle`;

                    return (
                        <div key={f.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
                            <div className="grid md:grid-cols-3 gap-[8px]">
                                <div className="flex flex-col gap-[4px]">
                                    <input className={cls(!!err(iconP))} placeholder="icon" {...registerAction(iconP)} />
                                    {!!err(iconP) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(iconP)?.message)}
                    </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-[4px]">
                                    <input className={cls(!!err(titleP))} placeholder="title" {...registerAction(titleP)} />
                                    {!!err(titleP) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(titleP)?.message)}
                    </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-[4px]">
                                    <input className={cls(!!err(subtP))} placeholder="subtitle" {...registerAction(subtP)} />
                                    {!!err(subtP) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(subtP)?.message)}
                    </span>
                                    )}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="text-[12px] leading-[16px] underline"
                                onClick={() => itemsFA.remove(i)}
                            >
                                ×
                            </button>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => itemsFA.append({ icon: "", title: "", subtitle: "" })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
