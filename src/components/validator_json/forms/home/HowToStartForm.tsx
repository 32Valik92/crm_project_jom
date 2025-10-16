// src/components/validator_json/forms/home/HowToStartForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeHowToStartForm({
                                               control,
                                               registerAction,
                                           }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const stepsFA = useFieldArray({ control, name: "steps" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (stepsFA.fields.length === 0)
            stepsFA.append({ id: "1", text: "", highlight: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (path: string) =>
        path.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (has: boolean) =>
        ["rounded-[4px] border p-[8px] w-full", has ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[16px]">
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">
            {String(err("title")?.message)}
          </span>
                )}
            </div>

            <div className="space-y-[8px] rounded-[6px] border p-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">steps</div>

                {stepsFA.fields.map((f, i) => {
                    const idP = `steps.${i}.id`;
                    const textP = `steps.${i}.text`;
                    const hlP = `steps.${i}.highlight`;

                    return (
                        <div key={f.id} className="rounded-[4px] border p-[12px] space-y-[8px]">
                            <div className="grid md:grid-cols-3 gap-[8px]">
                                <input
                                    className={cls(!!err(idP))}
                                    placeholder="id"
                                    {...registerAction(idP)}
                                />
                                <input
                                    className={cls(!!err(textP))}
                                    placeholder="text"
                                    {...registerAction(textP)}
                                />
                                <button
                                    type="button"
                                    className="text-[12px] leading-[16px] underline"
                                    onClick={() => stepsFA.remove(i)}
                                >
                                    ×
                                </button>
                            </div>

                            <label className="flex items-center gap-[6px] text-[12px] leading-[16px]">
                                <input type="checkbox" {...registerAction(hlP)} />
                                highlight
                            </label>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() =>
                        stepsFA.append({
                            id: String(stepsFA.fields.length + 1),
                            text: "",
                            highlight: false,
                        })
                    }
                >
                    Додати крок
                </button>
            </div>
        </div>
    );
}
