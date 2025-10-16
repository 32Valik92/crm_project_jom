// src/components/validator_json/forms/home/FaqForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeFaqForm({
                                        control,
                                        registerAction,
                                    }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const itemsFA = useFieldArray({ control, name: "items" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (itemsFA.fields.length === 0)
            itemsFA.append({ id: "1", question: "", answer: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const err = (path: string) =>
        path.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (has: boolean) =>
        ["rounded-[4px] border p-[8px] w-full", has ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[12px]">
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
                <div className="text-[14px] leading-[20px] font-medium">FAQ items</div>

                {itemsFA.fields.map((f, i) => {
                    const idPath = `items.${i}.id`;
                    const qPath = `items.${i}.question`;
                    const aPath = `items.${i}.answer`;

                    const idErr = !!err(idPath);
                    const qErr = !!err(qPath);
                    const aErr = !!err(aPath);

                    return (
                        <div key={f.id} className="rounded-[4px] border p-[12px] space-y-[8px]">
                            <div className="grid md:grid-cols-3 gap-[8px]">
                                <input
                                    className={cls(idErr)}
                                    placeholder="id"
                                    {...registerAction(idPath)}
                                />
                                <input
                                    className={cls(qErr)}
                                    placeholder="question"
                                    {...registerAction(qPath)}
                                />
                                <button
                                    type="button"
                                    className="text-[12px] leading-[16px] underline"
                                    onClick={() => itemsFA.remove(i)}
                                >
                                    ×
                                </button>
                            </div>
                            <textarea
                                className={cls(aErr)}
                                rows={3}
                                placeholder="answer"
                                {...registerAction(aPath)}
                            />
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() =>
                        itemsFA.append({
                            id: String(itemsFA.fields.length + 1),
                            question: "",
                            answer: "",
                        })
                    }
                >
                    Додати питання
                </button>
            </div>
        </div>
    );
}
