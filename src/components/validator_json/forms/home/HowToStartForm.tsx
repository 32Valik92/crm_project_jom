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
    }, []);

    const err = (path: string) =>
        path.split(".").reduce((a, k) => (a ? a[k] : undefined), errors);

    const cls = (has: boolean) =>
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            has ? "border-red-600" : "",
        ].join(" ");

    return (
        <div className="space-y-4">
            
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>

            
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">steps</div>

                {stepsFA.fields.map((f, i) => {
                    const idP = `steps.${i}.id`;
                    const textP = `steps.${i}.text`;
                    const hlP = `steps.${i}.highlight`;

                    return (
                        <div key={f.id} className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
                            <div className="grid gap-2 md:grid-cols-3">
                                <input className={cls(!!err(idP))} placeholder="id" {...registerAction(idP)} />
                                <input className={cls(!!err(textP))} placeholder="text" {...registerAction(textP)} />
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                        onClick={() => stepsFA.remove(i)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            <label className="inline-flex items-center gap-2 text-xs text-slate-200">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-sky-600"
                                    {...registerAction(hlP)}
                                />
                                highlight
                            </label>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
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
