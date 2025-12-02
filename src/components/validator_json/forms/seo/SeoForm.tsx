"use client";

import { useEffect, useMemo, useRef } from "react";
import {
    type Control,
    type UseFormRegister,
    type UseFormSetValue,
    useFieldArray,
    useWatch,
    useFormState,
} from "react-hook-form";

const SEO_KEYS = [
    "home","about","app","bonus","bonus__cashback","bonus__deposit","bonus__freebet","bonus__freespin","bonus__promocode",
    "contacts","faq","responsible_game","slots","slots__aviator","slots__book_of_dead","slots__book_of_ra_deluxe",
    "slots__chicken_road","slots__fruit_cocktail","slots__plinko","slots__popular","sportsbook","sportsbook__football",
    "sportsbook__basketball",
] as const;

export default function SeoForm({
                                    control,
                                    registerAction,
                                    setValue,
                                }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
}) {
    const rowsFA = useFieldArray({ control, name: "__seo_rows" as any });


    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current) return;
        if (rowsFA.fields.length === 0) rowsFA.append({ key: "home" });
        didInit.current = true;

    }, []);

    const rows =
        (useWatch({ control, name: "__seo_rows" }) || []) as Array<{ key?: string }>;

    const usedKeys = useMemo(
        () => new Set(rows.map((r) => r?.key).filter(Boolean) as string[]),
        [rows]
    );

    const { errors } = useFormState({ control });

    const err = (p: string) =>
        p.split(".").reduce((a: any, k) => (a ? a[k] : undefined), errors);

    const cls = (bad: boolean) =>
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            bad ? "border-red-600" : "",
        ].join(" ");

    const nextFreeKey = SEO_KEYS.find((k) => !usedKeys.has(k));


    const errorDetails = useMemo(() => {
        const list: Array<{ where: string; msg: string }> = [];
        const seoErr = (errors as any)?.seo ?? {};
        for (const k of Object.keys(seoErr)) {
            if (seoErr[k]?.title?.message)
                list.push({ where: `${k} → title`, msg: String(seoErr[k].title.message) });
            if (seoErr[k]?.description?.message)
                list.push({
                    where: `${k} → description`,
                    msg: String(seoErr[k].description.message),
                });
        }
        const rowsErr = (errors as any)?.__seo_rows ?? {};
        for (const idx of Object.keys(rowsErr)) {
            if (rowsErr[idx]?.key?.message)
                list.push({
                    where: `рядок ${Number(idx) + 1} → page`,
                    msg: String(rowsErr[idx].key.message),
                });
        }
        return list;
    }, [errors]);

    return (
        <div className="space-y-4">
            {errorDetails.length > 0 && (
                <div className="rounded-md border border-red-700 bg-red-900 p-3 text-xs leading-5 text-red-200">
                    <div className="mb-1.5 font-semibold">
                        Перевір поля SEO — знайдено {errorDetails.length} помил
                        {errorDetails.length === 1 ? "ку" : errorDetails.length < 5 ? "ки" : "ок"}:
                    </div>
                    <ul className="list-disc pl-4 space-y-0.5">
                        {errorDetails.map((e, i) => (
                            <li key={i}>
                                <span className="font-semibold text-red-100">{e.where}:</span> {e.msg}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 space-y-4">
                {rowsFA.fields.map((row, idx) => (
                    <SeoRow
                        key={row.id}
                        idx={idx}
                        control={control}
                        registerAction={registerAction}
                        setValue={setValue}
                        usedKeys={usedKeys}
                        removeRow={(k?: string) => {
                            rowsFA.remove(idx);
                            if (k) setValue(`seo.${k}`, undefined as any, { shouldDirty: true });
                        }}
                        cls={cls}
                        err={err}
                    />
                ))}

                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={() => {
                        if (!nextFreeKey) return;
                        rowsFA.append({ key: nextFreeKey });
                    }}
                    disabled={!nextFreeKey}
                    title={!nextFreeKey ? "Усі сторінки вже додані" : "Додати нову сторінку"}
                >
                    Додати сторінку SEO
                </button>
            </div>
        </div>
    );
}

function SeoRow({
                    idx,
                    control,
                    registerAction,
                    setValue,
                    usedKeys,
                    removeRow,
                    cls,
                    err,
                }: {
    idx: number;
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    usedKeys: Set<string>;
    removeRow: (key?: string) => void;
    cls: (bad: boolean) => string;
    err: (p: string) => any;
}) {
    const keyField = `__seo_rows.${idx}.key`;
    const selectedKey = useWatch({ control, name: keyField }) as string | undefined;


    const watchBase = selectedKey ?? "__none__";
    const [titleVal, descVal] = useWatch({
        control,
        name: [`seo.${watchBase}.title`, `seo.${watchBase}.description`],
    }) as [unknown, unknown];


    useEffect(() => {
        if (!selectedKey) return;
        if (typeof titleVal !== "string")
            setValue(`seo.${selectedKey}.title`, "", { shouldDirty: true });
        if (typeof descVal !== "string")
            setValue(`seo.${selectedKey}.description`, "", { shouldDirty: true });

    }, [selectedKey, titleVal, descVal]);

    const base = selectedKey ? `seo.${selectedKey}` : "";

    const keyError = !!err(keyField);
    const titleError = !!(selectedKey && err(`${base}.title`));
    const descError = !!(selectedKey && err(`${base}.description`));

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">page</span>
                    <select
                        className={cls(keyError)}
                        {...registerAction(keyField as any, { required: "Вибери сторінку" })}
                        aria-invalid={keyError || undefined}
                    >
                        <option value="">— select page —</option>
                        {SEO_KEYS.map((k) => {
                            const taken = usedKeys.has(k) && k !== selectedKey;
                            return (
                                <option key={k} value={k} disabled={taken}>
                                    {k}
                                </option>
                            );
                        })}
                    </select>
                    {keyError && (
                        <span className="text-xs text-red-500">
              {String(err(keyField)?.message ?? "Вибери сторінку")}
            </span>
                    )}
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">title</span>
                    {selectedKey ? (
                        <>
                            <input
                                className={cls(titleError)}
                                {...registerAction(`${base}.title` as any, {
                                    required: "Обов’язкове поле",
                                })}
                                aria-invalid={titleError || undefined}
                            />
                            {titleError && (
                                <span className="text-xs text-red-500">
                  {String(err(`${base}.title`)?.message)}
                </span>
                            )}
                        </>
                    ) : (
                        <input
                            className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 w-full text-slate-400"
                            disabled
                        />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">description</span>
                {selectedKey ? (
                    <>
            <textarea
                rows={3}
                className={cls(descError)}
                {...registerAction(`${base}.description` as any, {
                    required: "Обов’язкове поле",
                })}
                aria-invalid={descError || undefined}
            />
                        {descError && (
                            <span className="text-xs text-red-500">
                {String(err(`${base}.description`)?.message)}
              </span>
                        )}
                    </>
                ) : (
                    <textarea
                        rows={3}
                        className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 w-full text-slate-400"
                        disabled
                    />
                )}
            </div>

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-red-700 hover:border-red-700 transition"
                onClick={() => removeRow(selectedKey)}
            >
                Видалити
            </button>
        </div>
    );
}
