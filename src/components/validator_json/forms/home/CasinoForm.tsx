// src/components/validator_json/forms/slots/CasinoForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

function getErr(errors: any, path: string) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), errors);
}

export default function HomeCasinoForm({
                                            control,
                                            registerAction,
                                        }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const cardsFA = useFieldArray({ control, name: "cards" as any });

    useEffect(() => {
        if (cardsFA.fields.length === 0) cardsFA.append({ title: "", image: { src: "", alt: "" } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardsFA.fields.length]);

    const errors = (control as any)._formState?.errors ?? {};

    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input
                    className={["rounded-[4px] border p-[8px]", getErr(errors, "title") ? "border-[#dc2626]" : ""].join(" ")}
                    {...registerAction("title")}
                />
                {getErr(errors, "title") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">Обов’язкове поле</span>
                )}
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">subtitle</span>
                <input
                    className={["rounded-[4px] border p-[8px]", getErr(errors, "subtitle") ? "border-[#dc2626]" : ""].join(" ")}
                    {...registerAction("subtitle")}
                />
                {getErr(errors, "subtitle") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">Обов’язкове поле</span>
                )}
            </label>

            <div className="rounded-[6px] border p-[12px] space-y-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">cards</div>

                {cardsFA.fields.map((card, idx) => (
                    <div key={card.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
                        <label className="flex flex-col gap-[4px]">
                            <span className="text-[12px] leading-[16px] text-[#525252]">cards[{idx}].title</span>
                            <input
                                className={["rounded-[4px] border p-[8px]", getErr(errors, `cards.${idx}.title`) ? "border-[#dc2626]" : ""].join(" ")}
                                {...registerAction(`cards.${idx}.title`)}
                            />
                            {getErr(errors, `cards.${idx}.title`) && (
                                <span className="text-[12px] leading-[16px] text-[#dc2626]">Обов’язкове поле</span>
                            )}
                        </label>

                        <div className="grid md:grid-cols-2 gap-[8px]">
                            <label className="flex flex-col gap-[4px]">
                                <span className="text-[12px] leading-[16px] text-[#525252]">cards[{idx}].image.src</span>
                                <input
                                    className={["rounded-[4px] border p-[8px]", getErr(errors, `cards.${idx}.image.src`) ? "border-[#dc2626]" : ""].join(" ")}
                                    {...registerAction(`cards.${idx}.image.src`)}
                                />
                                {getErr(errors, `cards.${idx}.image.src`) && (
                                    <span className="text-[12px] leading-[16px] text-[#dc2626]">Обов’язкове поле</span>
                                )}
                            </label>

                            <label className="flex flex-col gap-[4px]">
                                <span className="text-[12px] leading-[16px] text-[#525252]">cards[{idx}].image.alt</span>
                                <input
                                    className={["rounded-[4px] border p-[8px]", getErr(errors, `cards.${idx}.image.alt`) ? "border-[#dc2626]" : ""].join(" ")}
                                    {...registerAction(`cards.${idx}.image.alt`)}
                                />
                                {getErr(errors, `cards.${idx}.image.alt`) && (
                                    <span className="text-[12px] leading-[16px] text-[#dc2626]">Обов’язкове поле</span>
                                )}
                            </label>
                        </div>

                        <button
                            type="button"
                            className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                            onClick={() => cardsFA.remove(idx)}
                        >
                            Видалити картку
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => cardsFA.append({ title: "", image: { src: "", alt: "" } })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
