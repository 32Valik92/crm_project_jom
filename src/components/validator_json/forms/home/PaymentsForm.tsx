// src/components/validator_json/forms/home/PaymentsForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomePaymentsForm({
                                             control,
                                             registerAction,
                                         }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const depRowsFA = useFieldArray({ control, name: "deposit.rows" as any });
    const wdrRowsFA = useFieldArray({ control, name: "withdrawal.rows" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (depRowsFA.fields.length === 0)
            depRowsFA.append({ method: "", min: "", processing: "", fees: "" });
        if (wdrRowsFA.fields.length === 0)
            wdrRowsFA.append({ method: "", min: "", processing: "", fees: "" });
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

            {/* subtitle */}
            <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide">
          subtitle
        </span>
                <input className={cls(!!err("subtitle"))} {...registerAction("subtitle")} />
                {!!err("subtitle") && (
                    <span className="text-xs text-red-500">{String(err("subtitle")?.message)}</span>
                )}
            </div>

            {/* sections */}
            <SectionTable
                prefix="deposit"
                control={control}
                registerAction={registerAction}
                rowsFA={depRowsFA}
                errors={errors}
                err={err}
                cls={cls}
            />

            <SectionTable
                prefix="withdrawal"
                control={control}
                registerAction={registerAction}
                rowsFA={wdrRowsFA}
                errors={errors}
                err={err}
                cls={cls}
            />

            {/* note */}
            <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide">
          note
        </span>
                <input className={cls(!!err("note"))} {...registerAction("note")} />
                {!!err("note") && (
                    <span className="text-xs text-red-500">{String(err("note")?.message)}</span>
                )}
            </div>
        </div>
    );
}

function SectionTable({
                          prefix,
                          control,
                          registerAction,
                          rowsFA,
                          errors,
                          err,
                          cls,
                      }: {
    prefix: "deposit" | "withdrawal";
    control: Control;
    registerAction: UseFormRegister<any>;
    rowsFA: ReturnType<typeof useFieldArray>;
    errors: any;
    err: (p: string) => any;
    cls: (bad: boolean) => string;
}) {
    return (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
            <div className="text-sm font-semibold text-slate-100">{prefix}</div>

            {/* section title */}
            <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
          {prefix}.title
        </span>
                <input className={cls(!!err(`${prefix}.title`))} {...registerAction(`${prefix}.title`)} />
                {!!err(`${prefix}.title`) && (
                    <span className="text-xs text-red-500">
            {String(err(`${prefix}.title`)?.message)}
          </span>
                )}
            </div>

            {/* columns */}
            <div className="grid gap-2 md:grid-cols-4">
                {(["method", "min", "processing", "fees"] as const).map((c) => {
                    const p = `${prefix}.columns.${c}`;
                    return (
                        <div key={p} className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-100">
                {p}
              </span>
                            <input className={cls(!!err(p))} {...registerAction(p)} />
                            {!!err(p) && (
                                <span className="text-xs text-red-500">{String(err(p)?.message)}</span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* rows table */}
            <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-200">{prefix}.rows</div>

                {rowsFA.fields.map((row, rIdx) => (
                    <div key={row.id} className="space-y-2 rounded-xl border border-slate-700 bg-slate-900 p-4">
                        <div className="grid gap-2 md:grid-cols-5">
                            {(["method", "min", "processing", "fees"] as const).map((c) => {
                                const p = `${prefix}.rows.${rIdx}.${c}`;
                                return (
                                    <input
                                        key={p}
                                        className={cls(!!err(p))}
                                        placeholder={c}
                                        {...registerAction(p)}
                                    />
                                );
                            })}

                            <div className="flex items-center justify-end">
                                <button
                                    type="button"
                                    className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                    onClick={() => rowsFA.remove(rIdx)}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() => rowsFA.append({ method: "", min: "", processing: "", fees: "" })}
                >
                    Додати рядок
                </button>
            </div>
        </div>
    );
}
