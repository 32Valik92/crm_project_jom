// src/components/validator_json/forms/footer/FooterForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

export default function FooterForm({
                                       control,
                                       registerAction,
                                   }: {
    control: Control;
    registerAction: UseFormRegister<any>;
}) {
    const columnsFA = useFieldArray({ control, name: "columns" as any });

    useEffect(() => {
        if (columnsFA.fields.length === 0) {
            columnsFA.append({ links: [{ label: "", href: "" }] });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            {/* tagline */}
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide">tagline</span>
                <input
                    className={[
                        "rounded-md border border-slate-600 bg-slate-900 px-3 py-2",
                        "text-slate-50 outline-none transition",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
                    ].join(" ")}
                    {...registerAction("tagline")}
                />
            </label>

            {/* columns */}
            <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">columns</div>

                {columnsFA.fields.map((col, cIdx) => (
                    <ColumnEditor
                        key={col.id}
                        control={control}
                        registerAction={registerAction}
                        cIdx={cIdx}
                        onRemove={() => columnsFA.remove(cIdx)}
                    />
                ))}

                <button
                    type="button"
                    className={[
                        "rounded-md border border-slate-600 bg-slate-800 px-3 py-2",
                        "text-xs font-medium text-slate-100 transition hover:bg-slate-700",
                    ].join(" ")}
                    onClick={() => columnsFA.append({ links: [{ label: "", href: "" }] })}
                >
                    Додати колонку
                </button>
            </div>

            {/* bottom */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">bottom</div>
                <input
                    className={[
                        "rounded-md border border-slate-600 bg-slate-900 px-3 py-2",
                        "text-slate-50 outline-none transition",
                        "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
                    ].join(" ")}
                    placeholder="copyright"
                    {...registerAction("bottom.copyright")}
                />
            </div>
        </div>
    );
}

function ColumnEditor({
                          control,
                          registerAction,
                          cIdx,
                          onRemove,
                      }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    cIdx: number;
    onRemove: () => void;
}) {
    const linksFA = useFieldArray({ control, name: `columns.${cIdx}.links` as any });

    useEffect(() => {
        if (linksFA.fields.length === 0) linksFA.append({ label: "", href: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cIdx]);

    return (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
            <div className="text-xs font-semibold text-slate-200">columns[{cIdx}].links</div>

            {linksFA.fields.map((l, iIdx) => (
                <div key={l.id} className="grid gap-3 md:grid-cols-2">
                    <input
                        className={[
                            "rounded-md border border-slate-600 bg-slate-800 px-3 py-2",
                            "text-slate-50 outline-none transition",
                            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
                        ].join(" ")}
                        placeholder="label"
                        {...registerAction(`columns.${cIdx}.links.${iIdx}.label`)}
                    />
                    <div className="flex items-center gap-2">
                        <input
                            className={[
                                "w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2",
                                "text-slate-50 outline-none transition",
                                "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
                            ].join(" ")}
                            placeholder="href"
                            {...registerAction(`columns.${cIdx}.links.${iIdx}.href`)}
                        />
                        <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                            onClick={() => linksFA.remove(iIdx)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className={[
                        "rounded-md border border-slate-600 bg-slate-800 px-3 py-2",
                        "text-xs font-medium text-slate-100 transition hover:bg-slate-700",
                    ].join(" ")}
                    onClick={() => linksFA.append({ label: "", href: "" })}
                >
                    Додати link
                </button>

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-red-700 hover:border-red-700"
                    onClick={onRemove}
                >
                    Видалити колонку
                </button>
            </div>
        </div>
    );
}
