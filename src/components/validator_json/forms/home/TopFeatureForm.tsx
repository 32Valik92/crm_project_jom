// src/components/validator_json/forms/home/TopFeatureForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeTopFeatureForm({
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
            cardsFA.append({ srcImg: "", altImg: "", title: "", description: "" });
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

    return (
        <div className="space-y-4">
            {/* title */}
            <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide">
          title
        </span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>

            {/* cards */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">cards</div>

                {cardsFA.fields.map((card, cIdx) => {
                    const base = `cards.${cIdx}`;
                    return (
                        <div key={card.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
                            <div className="grid gap-2 md:grid-cols-5">
                                {/* srcImg */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.srcImg
                  </span>
                                    <input className={cls(!!err(`${base}.srcImg`))} {...registerAction(`${base}.srcImg`)} />
                                    {!!err(`${base}.srcImg`) && (
                                        <span className="text-xs text-red-500">{String(err(`${base}.srcImg`)?.message)}</span>
                                    )}
                                </div>

                                {/* altImg */}
                                <div className="md:col-span-1 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.altImg
                  </span>
                                    <input className={cls(!!err(`${base}.altImg`))} {...registerAction(`${base}.altImg`)} />
                                    {!!err(`${base}.altImg`) && (
                                        <span className="text-xs text-red-500">{String(err(`${base}.altImg`)?.message)}</span>
                                    )}
                                </div>

                                {/* title */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.title
                  </span>
                                    <input className={cls(!!err(`${base}.title`))} {...registerAction(`${base}.title`)} />
                                    {!!err(`${base}.title`) && (
                                        <span className="text-xs text-red-500">{String(err(`${base}.title`)?.message)}</span>
                                    )}
                                </div>
                            </div>

                            {/* description */}
                            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                  {base}.description
                </span>
                                <textarea
                                    className={cls(!!err(`${base}.description`))}
                                    rows={3}
                                    {...registerAction(`${base}.description`)}
                                />
                                {!!err(`${base}.description`) && (
                                    <span className="text-xs text-red-500">
                    {String(err(`${base}.description`)?.message)}
                  </span>
                                )}
                            </div>

                            {/* remove */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                    onClick={() => cardsFA.remove(cIdx)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() =>
                        cardsFA.append({ srcImg: "", altImg: "", title: "", description: "" })
                    }
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
