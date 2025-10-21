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
    const cls = (bad: boolean) =>
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            bad ? "border-red-600" : "",
        ].join(" ");

    function nextId(): number {
        const arr = steps ?? [];
        const max = arr.reduce((m, it) => (typeof it?.id === "number" && it.id > m ? it.id : m), 0);
        return Math.max(1, max + 1);
    }

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

            {/* steps */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">steps</div>

                {stepsFA.fields.map((row, rIdx) => {
                    const idPath = `steps.${rIdx}.id`;
                    const textPath = `steps.${rIdx}.text`;
                    const idErr = !!err(idPath);
                    const textErr = !!err(textPath);

                    return (
                        <div key={row.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
                            <div className="grid gap-2 md:grid-cols-5">
                                {/* id */}
                                <div className="flex flex-col gap-1.5 md:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {idPath}
                  </span>
                                    <input
                                        className={cls(idErr)}
                                        type="number"
                                        {...registerAction(idPath, { valueAsNumber: true })}
                                    />
                                    {idErr && (
                                        <span className="text-xs text-red-500">{String(err(idPath)?.message)}</span>
                                    )}
                                </div>

                                {/* text */}
                                <div className="flex flex-col gap-1.5 md:col-span-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {textPath}
                  </span>
                                    <input className={cls(textErr)} {...registerAction(textPath)} />
                                    {textErr && (
                                        <span className="text-xs text-red-500">{String(err(textPath)?.message)}</span>
                                    )}
                                </div>

                                {/* remove */}
                                <div className="md:col-span-1 flex items-end justify-end">
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
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
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() => stepsFA.append({ id: nextId(), text: "" })}
                >
                    Додати крок
                </button>
            </div>
        </div>
    );
}
