// src/components/validator_json/forms/home/RegistrationGuideForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray, useWatch } from "react-hook-form";

export default function HomeRegistrationGuideForm({
                                                      control,
                                                      registerAction,
                                                  }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const stepsFA = useFieldArray({ control, name: "steps" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};
    const steps = useWatch({ control, name: "steps" }) as Array<{ id?: number; text?: string }> | undefined;

    useEffect(() => {
        if (stepsFA.fields.length === 0) {
            stepsFA.append({ id: 1, text: "" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (p: string) => p.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (bad: boolean) => ["rounded-[4px] border p-[8px] w-full", bad ? "border-[#dc2626]" : ""].join(" ");

    function nextId(): number {
        const arr = steps ?? [];
        const max = arr.reduce((m, it) => (typeof it?.id === "number" && it.id > m ? it.id : m), 0);
        return Math.max(1, max + 1);
    }

    return (
        <div className="space-y-[16px]">
            {/* title */}
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("title")?.message)}</span>
                )}
            </div>

            {/* steps */}
            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">steps</div>

                {stepsFA.fields.map((row, rIdx) => {
                    const idPath = `steps.${rIdx}.id`;
                    const textPath = `steps.${rIdx}.text`;
                    const idErr = !!err(idPath);
                    const textErr = !!err(textPath);

                    return (
                        <div key={row.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
                            <div className="grid md:grid-cols-5 gap-[8px]">
                                <div className="flex flex-col gap-[4px] md:col-span-1">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{idPath}</span>
                                    <input
                                        className={cls(idErr)}
                                        type="number"
                                        {...registerAction(idPath, { valueAsNumber: true })}
                                    />
                                    {idErr && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(idPath)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-[4px] md:col-span-3">
                                    <span className="text-[12px] leading-[16px] text-[#525252]">{textPath}</span>
                                    <input className={cls(textErr)} {...registerAction(textPath)} />
                                    {textErr && (
                                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
                      {String(err(textPath)?.message)}
                    </span>
                                    )}
                                </div>

                                <div className="md:col-span-1 flex items-end">
                                    <button
                                        type="button"
                                        className="text-[12px] leading-[16px] underline"
                                        onClick={() => stepsFA.remove(rIdx)}
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
                    onClick={() => stepsFA.append({ id: nextId(), text: "" })}
                >
                    Додати крок
                </button>
            </div>
        </div>
    );
}
