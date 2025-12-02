"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function HomeFaqForm({
                                        control,
                                        registerAction,
                                    }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const itemsFA = useFieldArray({ control, name: "items" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (itemsFA.fields.length === 0) itemsFA.append({ id: "1", question: "", answer: "" });
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
            
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>


            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">FAQ items</div>

                {itemsFA.fields.map((f, i) => {
                    const idPath = `items.${i}.id`;
                    const qPath = `items.${i}.question`;
                    const aPath = `items.${i}.answer`;

                    const idErr = !!err(idPath);
                    const qErr = !!err(qPath);
                    const aErr = !!err(aPath);

                    return (
                        <div key={f.id} className="space-y-2 rounded-xl border border-slate-700 bg-slate-900 p-4">
                            <div className="grid gap-2 md:grid-cols-3">
                                <input className={cls(idErr)} placeholder="id" {...registerAction(idPath)} />
                                <input
                                    className={cls(qErr)}
                                    placeholder="question"
                                    {...registerAction(qPath)}
                                />
                                <div className="flex items-center justify-end">
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                        onClick={() => itemsFA.remove(i)}
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>

                            <textarea
                                className={cls(aErr)}
                                rows={3}
                                placeholder="answer"
                                {...registerAction(aPath)}
                            />
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() =>
                        itemsFA.append({
                            id: String(itemsFA.fields.length + 1),
                            question: "",
                            answer: "",
                        })
                    }
                >
                    Додати питання
                </button>
            </div>
        </div>
    );
}
