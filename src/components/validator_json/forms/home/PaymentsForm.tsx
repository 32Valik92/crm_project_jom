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
    const cls = (bad: boolean) => ["rounded-[4px] border p-[8px] w-full", bad ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[16px]">
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("title")?.message)}</span>}
            </div>

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">subtitle</span>
                <input className={cls(!!err("subtitle"))} {...registerAction("subtitle")} />
                {!!err("subtitle") && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("subtitle")?.message)}</span>}
            </div>

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

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">note</span>
                <input className={cls(!!err("note"))} {...registerAction("note")} />
                {!!err("note") && <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err("note")?.message)}</span>}
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
        <div className="space-y-[10px] rounded-[6px] border p-[12px]">
            <div className="text-[14px] leading-[20px] font-medium">{prefix}</div>

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">{prefix}.title</span>
                <input className={cls(!!err(`${prefix}.title`))} {...registerAction(`${prefix}.title`)} />
                {!!err(`${prefix}.title`) && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err(`${prefix}.title`)?.message)}</span>
                )}
            </div>

            <div className="grid md:grid-cols-4 gap-[8px]">
                {(["method", "min", "processing", "fees"] as const).map((c) => {
                    const p = `${prefix}.columns.${c}`;
                    return (
                        <div key={p} className="flex flex-col gap-[4px]">
                            <span className="text-[12px] leading-[16px] text-[#525252]">{p}</span>
                            <input className={cls(!!err(p))} {...registerAction(p)} />
                            {!!err(p) && (
                                <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(err(p)?.message)}</span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="space-y-[8px]">
                <div className="text-[12px] leading-[16px] font-medium">{prefix}.rows</div>
                {rowsFA.fields.map((row, rIdx) => (
                    <div key={row.id} className="rounded-[6px] border p-[12px] space-y-[8px]">
                        <div className="grid md:grid-cols-5 gap-[8px]">
                            {(["method", "min", "processing", "fees"] as const).map((c) => {
                                const p = `${prefix}.rows.${rIdx}.${c}`;
                                return (
                                    <input key={p} className={cls(!!err(p))} placeholder={c} {...registerAction(p)} />
                                );
                            })}
                            <button
                                type="button"
                                className="text-[12px] leading-[16px] underline"
                                onClick={() => rowsFA.remove(rIdx)}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => rowsFA.append({ method: "", min: "", processing: "", fees: "" })}
                >
                    Додати рядок
                </button>
            </div>
        </div>
    );
}
