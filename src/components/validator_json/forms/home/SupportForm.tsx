// src/components/validator_json/forms/home/SupportForm.tsx
"use client";

import { useEffect } from "react";
import {
    type Control,
    type UseFormRegister,
    useFieldArray,
    UseFormSetValue,
} from "react-hook-form";
import ImageUploader from "@/components/validator_json/ImageUploader";

export default function HomeSupportForm({
                                            control,
                                            registerAction,
                                            setValue,
                                            page,
                                        }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    page?: string;
}) {
    const itemsFA = useFieldArray({ control, name: "items" as any });
    const errors: any = (control as any)?._formState?.errors ?? {};

    useEffect(() => {
        if (itemsFA.fields.length === 0) {
            itemsFA.append({ icon: "", label: "", value: "", badge: "" });
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

    const basePath = `${page ?? "home"}/support`;

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

            {/* items */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
                <div className="text-sm font-semibold text-slate-100">items</div>

                {itemsFA.fields.map((row, rIdx) => {
                    const base = `items.${rIdx}`;
                    return (
                        <div
                            key={row.id}
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
                                        block={"home_support"}
                                        fieldPath={`${base}.icon`} // шлях запишеться сюди
                                        basePath={basePath}         // images/<page>/support/
                                        variant={`item-${rIdx}`}    // стабільний суфікс
                                        setValue={setValue}
                                        label="Завантажити іконку"
                                    />
                                    {!!err(`${base}.icon`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.icon`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* label */}
                                <div className="md:col-span-1 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.label
                  </span>
                                    <input className={cls(!!err(`${base}.label`))} {...registerAction(`${base}.label`)} />
                                    {!!err(`${base}.label`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.label`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* value */}
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.value
                  </span>
                                    <input className={cls(!!err(`${base}.value`))} {...registerAction(`${base}.value`)} />
                                    {!!err(`${base}.value`) && (
                                        <span className="text-xs text-red-500">
                      {String(err(`${base}.value`)?.message)}
                    </span>
                                    )}
                                </div>

                                {/* badge (optional) */}
                                <div className="md:col-span-4 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">
                    {base}.badge (optional)
                  </span>
                                    <input className={cls(!!err(`${base}.badge`))} {...registerAction(`${base}.badge`)} />
                                </div>

                                {/* remove */}
                                <div className="md:col-span-1 flex items-end justify-end">
                                    <button
                                        type="button"
                                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                                        onClick={() => itemsFA.remove(rIdx)}
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
                    onClick={() => itemsFA.append({ icon: "", label: "", value: "", badge: "" })}
                >
                    Додати пункт
                </button>
            </div>
        </div>
    );
}
