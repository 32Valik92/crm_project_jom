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

    const err = (path: string) => path.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);
    const cls = (has: boolean) =>
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            has ? "border-red-600" : "",
        ].join(" ");

    return (
        <div className="space-y-4">
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">items</div>

                {itemsFA.fields.map((f, i) => {
                    const iconP = `items.${i}.icon`;
                    const titleP = `items.${i}.title`;
                    const subtP = `items.${i}.subtitle`;

                    return (
                        <div key={f.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
                            <div className="grid gap-3 md:grid-cols-3">
                                {/* icon */}
                                <div className="flex flex-col gap-1.5">
                                    <input className={cls(!!err(iconP))} placeholder="icon" {...registerAction(iconP)} />
                                    {!!err(iconP) && (
                                        <span className="text-xs text-red-500">{String(err(iconP)?.message)}</span>
                                    )}
                                </div>

                                {/* title */}
                                <div className="flex flex-col gap-1.5">
                                    <input className={cls(!!err(titleP))} placeholder="title" {...registerAction(titleP)} />
                                    {!!err(titleP) && (
                                        <span className="text-xs text-red-500">{String(err(titleP)?.message)}</span>
                                    )}
                                </div>

                                {/* subtitle */}
                                <div className="flex flex-col gap-1.5">
                                    <input className={cls(!!err(subtP))} placeholder="subtitle" {...registerAction(subtP)} />
                                    {!!err(subtP) && (
                                        <span className="text-xs text-red-500">{String(err(subtP)?.message)}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                    onClick={() => itemsFA.remove(i)}
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
                    onClick={() => itemsFA.append({ icon: "", title: "", subtitle: "" })}
                >
                    Додати картку
                </button>
            </div>
        </div>
    );
}
