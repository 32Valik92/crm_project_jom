// src/components/validator_json/forms/home/SportsForm.tsx
"use client";

import { useEffect } from "react";
import {
    type Control,
    type UseFormRegister,
    useFieldArray,
    UseFormSetValue,
} from "react-hook-form";
import ImageUploader from "@/components/validator_json/ImageUploader";

export default function HomeSportsForm({
                                           control,
                                           registerAction,
                                           setValue,
                                           page,
                                       }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    /** опційно: прикинеться з BlockFormDialog → ValidatorPage */
    page?: string;
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
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            bad ? "border-red-600" : "",
        ].join(" ");

    const basePath = `${page ?? "home"}/sports_cards_icon`;

    return (
        <div className="space-y-4">
            {/* title */}
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>

            {/* subtitle */}
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">subtitle</span>
                <input className={cls(!!err("subtitle"))} {...registerAction("subtitle")} />
                {!!err("subtitle") && (
                    <span className="text-xs text-red-500">{String(err("subtitle")?.message)}</span>
                )}
            </div>

            {/* cards */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">cards</div>

                {cardsFA.fields.map((card, cIdx) => {
                    const base = `cards.${cIdx}`;
                    return (
                        <div
                            key={card.id}
                            className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4"
                        >
                            <div className="grid gap-2 md:grid-cols-5 items-start">
                                {/* icon -> ImageUploader */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.icon
                  </span>
                                    <ImageUploader
                                        page={page ?? "home"}
                                        block={"home_sports"}
                                        fieldPath={`${base}.icon`} // записуємо шлях у JSON сюди
                                        basePath={basePath}        // images/<page>/sports/
                                        variant={`card-${cIdx}`}   // стабільний суфікс
                                        setValue={setValue}
                                    />
                                    {!!err(`${base}.icon`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.icon`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* title */}
                                <div className="md:col-span-1 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.title
                  </span>
                                    <input
                                        className={cls(!!err(`${base}.title`))}
                                        {...registerAction(`${base}.title`)}
                                    />
                                    {!!err(`${base}.title`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.title`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* subtitle */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.subtitle
                  </span>
                                    <input
                                        className={cls(!!err(`${base}.subtitle`))}
                                        {...registerAction(`${base}.subtitle`)}
                                    />
                                    {!!err(`${base}.subtitle`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.subtitle`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* remove */}
                                <div className="md:col-span-5 flex justify-end">
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
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
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() => cardsFA.append({ icon: "", title: "", subtitle: "" })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
