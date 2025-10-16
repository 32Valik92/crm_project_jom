// src/components/validator_json/forms/home/SportsForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeSportsForm({
                                           control,
                                           registerAction,
                                       }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const cardsFA = useFieldArray({ control, name: "cards" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (cardsFA.fields.length === 0) {
            cardsFA.append({ icon: "", title: "", subtitle: "" });
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

            {/* subtitle */}
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">subtitle</span>
                <input className={cls(!!err("subtitle"))} {...registerAction("subtitle")} />
                {!!err("subtitle") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">
            {String(err("subtitle")?.message)}
          </span>
                )}
            </div>

            {/* cards */}
            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">cards</div>

                {cardsFA.fields.map((card, cIdx) => {
                    const base = `cards.${cIdx}`;
                    return (
                        <div key={card.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
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
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.title</span>
                                    <input className={cls(!!err(`${base}.title`))} {...registerAction(`${base}.title`)} />
                                    {!!err(`${base}.title`) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(`${base}.title`)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="md:col-span-2 flex flex-col gap-[4px]">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{base}.subtitle</span>
                                    <input className={cls(!!err(`${base}.subtitle`))} {...registerAction(`${base}.subtitle`)} />
                                    {!!err(`${base}.subtitle`) && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(`${base}.subtitle`)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="md:col-span-5">
                                    <button
                                        type="button"
                                        className="text-[12px] leading-[16px] underline"
                                        onClick={() => cardsFA.remove(cIdx)}
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
                    onClick={() => cardsFA.append({ icon: "", title: "", subtitle: "" })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
