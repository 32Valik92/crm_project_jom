"use client";

import { useEffect } from "react";
import {
    type Control,
    type UseFormRegister,
    useFieldArray,
    UseFormSetValue,
} from "react-hook-form";
import ImageUploader from "@/components/validator_json/ImageUploader";

function getErr(errors: any, path: string) {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), errors);
}

export default function SlotsPopularCasinoForm({
                                           control,
                                           registerAction,
                                           setValue,
                                           page,
                                       }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    /** опційно, приходить з BlockFormDialog → ValidatorPage */
    page?: string;
}) {
    const cardsFA = useFieldArray({ control, name: "cards" as any });

    useEffect(() => {
        if (cardsFA.fields.length === 0)
            cardsFA.append({ title: "", image: { src: "", alt: "" } });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardsFA.fields.length]);

    const errors = (control as any)._formState?.errors ?? {};
    const basePath = `${page ?? "slots"}/popular/casino`;

    return (
        <div className="space-y-4">
            
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input
                    className={[
                        "rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                        getErr(errors, "title") ? "border-red-600" : "",
                    ].join(" ")}
                    {...registerAction("title")}
                />
                {getErr(errors, "title") && (
                    <span className="text-xs text-red-500">Обов’язкове поле</span>
                )}
            </label>

            
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">subtitle</span>
                <input
                    className={[
                        "rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                        getErr(errors, "subtitle") ? "border-red-600" : "",
                    ].join(" ")}
                    {...registerAction("subtitle")}
                />
                {getErr(errors, "subtitle") && (
                    <span className="text-xs text-red-500">Обов’язкове поле</span>
                )}
            </label>

            
            <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">cards</div>

                {cardsFA.fields.map((card, idx) => (
                    <div key={card.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
                        
                        <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                cards[{idx}].title
              </span>
                            <input
                                className={[
                                    "rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none",
                                    "focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                                    getErr(errors, `cards.${idx}.title`) ? "border-red-600" : "",
                                ].join(" ")}
                                {...registerAction(`cards.${idx}.title`)}
                            />
                            {getErr(errors, `cards.${idx}.title`) && (
                                <span className="text-xs text-red-500">Обов’язкове поле</span>
                            )}
                        </label>

                        
                        <div className="grid gap-3 md:grid-cols-2 items-start">
                            
                            <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                  cards[{idx}].image.src
                </span>
                                <ImageUploader
                                    page={page ?? "home"}
                                    block={"home_casino"}
                                    fieldPath={`cards.${idx}.image.src`}
                                    // для зручності складатимемо в images/<page>/casino/
                                    basePath={basePath}
                                    // необов’язково, але додасться до імені
                                    variant={`card-${idx}`}
                                    setValue={setValue}
                                    label="Завантажити зображення"
                                />
                                {getErr(errors, `cards.${idx}.image.src`) && (
                                    <span className="text-xs text-red-500">Обов’язкове поле</span>
                                )}
                            </div>

                            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                  cards[{idx}].image.alt
                </span>
                                <input
                                    className={[
                                        "rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none",
                                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                                        getErr(errors, `cards.${idx}.image.alt`) ? "border-red-600" : "",
                                    ].join(" ")}
                                    {...registerAction(`cards.${idx}.image.alt`)}
                                />
                                {getErr(errors, `cards.${idx}.image.alt`) && (
                                    <span className="text-xs text-red-500">Обов’язкове поле</span>
                                )}
                            </label>
                        </div>

                        <button
                            type="button"
                            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-red-700 hover:border-red-700 transition"
                            onClick={() => cardsFA.remove(idx)}
                        >
                            Видалити картку
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    onClick={() => cardsFA.append({ title: "", image: { src: "", alt: "" } })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
