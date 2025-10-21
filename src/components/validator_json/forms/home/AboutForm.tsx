// src/components/validator_json/forms/home/AboutForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeAboutForm({
                                          control,
                                          registerAction,
                                      }: { control: Control; registerAction: UseFormRegister<any> }) {
    const leadFA = useFieldArray({ control, name: "lead" as any });
    const rowsFA = useFieldArray({ control, name: "info.rows" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (leadFA.fields.length === 0) leadFA.append("");
        if (rowsFA.fields.length === 0) rowsFA.append({ label: "", value: "" });
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
            {/* title */}
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>

            {/* lead */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">lead</div>
                {leadFA.fields.map((f, i) => {
                    const path = `lead.${i}`;
                    const has = !!err(path);
                    return (
                        <div key={f.id} className="flex items-start gap-2">
                            <textarea className={cls(has)} rows={3} {...registerAction(path)} />
                            <button
                                type="button"
                                className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                                onClick={() => leadFA.remove(i)}
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
                {!!err("lead")?.message && (
                    <span className="text-xs text-red-500">{String(err("lead")?.message)}</span>
                )}
                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    onClick={() => leadFA.append("")}
                >
                    Додати пункт
                </button>
            </div>

            {/* info */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">info</div>

                <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
            info.heading
          </span>
                    <input className={cls(!!err("info.heading"))} {...registerAction("info.heading")} />
                    {!!err("info")?.heading && (
                        <span className="text-xs text-red-500">{String(err("info")?.heading?.message)}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-200">info.rows</div>
                    {rowsFA.fields.map((r, i) => {
                        const lp = `info.rows.${i}.label`;
                        const vp = `info.rows.${i}.value`;
                        const lHas = !!err(lp);
                        const vHas = !!err(vp);
                        return (
                            <div key={r.id} className="grid gap-2 md:grid-cols-2">
                                <input className={cls(lHas)} placeholder="label" {...registerAction(lp)} />
                                <div className="flex items-center gap-2">
                                    <input className={cls(vHas)} placeholder="value" {...registerAction(vp)} />
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                                        onClick={() => rowsFA.remove(i)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {!!err("info")?.rows?.message && (
                        <span className="text-xs text-red-500">{String(err("info")?.rows?.message)}</span>
                    )}
                    <button
                        type="button"
                        className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                        onClick={() => rowsFA.append({ label: "", value: "" })}
                    >
                        Додати рядок
                    </button>
                </div>
            </div>

            {/* safety */}
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">safety</span>
                <textarea className={cls(!!err("safety"))} rows={3} {...registerAction("safety")} />
                {!!err("safety") && (
                    <span className="text-xs text-red-500">{String(err("safety")?.message)}</span>
                )}
            </div>
        </div>
    );
}
