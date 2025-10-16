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

    // 👉 фікс дубля на старті (StrictMode)
    const didInit = useRef(false);
    useEffect(() => {
        if (didInit.current) return;
        if (rowsFA.fields.length === 0) rowsFA.append({ key: "home" });
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ["rounded-[4px] border p-[8px] w-full", bad ? "border-[#dc2626]" : ""].join(
            " "
        );

    const nextFreeKey = SEO_KEYS.find((k) => !usedKeys.has(k));

    // 👉 зручний детальний summary помилок
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
        <div className="space-y-[12px]">
            {errorDetails.length > 0 && (
                <div className="rounded-md border border-[#fecaca] bg-[#fef2f2] p-[8px] text-[12px] leading-[16px] text-[#b91c1c]">
                    <div className="mb-[4px]">
                        Перевір поля SEO — знайдено {errorDetails.length} помил
                        {errorDetails.length === 1 ? "ку" : errorDetails.length < 5 ? "ки" : "ок"}:
                    </div>
                    <ul className="list-disc pl-[16px]">
                        {errorDetails.map((e, i) => (
                            <li key={i}>
                                <span className="font-medium">{e.where}:</span> {e.msg}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="rounded-[6px] border p-[12px] space-y-[12px]">
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
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px] disabled:opacity-50"
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

    // стабільні watch, щоб не ламати хуки
    const watchBase = selectedKey ?? "__none__";
    const [titleVal, descVal] = useWatch({
        control,
        name: [`seo.${watchBase}.title`, `seo.${watchBase}.description`],
    }) as [unknown, unknown];

    // після вибору сторінки гарантуємо наявність полів
    useEffect(() => {
        if (!selectedKey) return;
        if (typeof titleVal !== "string")
            setValue(`seo.${selectedKey}.title`, "", { shouldDirty: true });
        if (typeof descVal !== "string")
            setValue(`seo.${selectedKey}.description`, "", { shouldDirty: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKey, titleVal, descVal]);

    const base = selectedKey ? `seo.${selectedKey}` : "";

    const keyError = !!err(keyField);
    const titleError = !!(selectedKey && err(`${base}.title`));
    const descError = !!(selectedKey && err(`${base}.description`));

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <div className="grid md:grid-cols-3 gap-[8px]">
                <div className="flex flex-col gap-[4px]">
                    <span className="text-[12px] leading-[16px] text-[#525252]">page</span>
                    <select
                        className={cls(keyError)}
                        {...registerAction(keyField as any, {
                            required: "Вибери сторінку",
                        })}
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
                        <span className="text-[12px] leading-[16px] text-[#dc2626]">
              {String(err(keyField)?.message ?? "Вибери сторінку")}
            </span>
                    )}
                </div>

                <div className="md:col-span-2 flex flex-col gap-[4px]">
                    <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
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
                                <span className="text-[12px] leading-[16px] text-[#dc2626]">
                  {String(err(`${base}.title`)?.message)}
                </span>
                            )}
                        </>
                    ) : (
                        <input
                            className="rounded-[4px] border p-[8px] w-full bg-neutral-50"
                            disabled
                        />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">description</span>
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
                            <span className="text-[12px] leading-[16px] text-[#dc2626]">
                {String(err(`${base}.description`)?.message)}
              </span>
                        )}
                    </>
                ) : (
                    <textarea
                        rows={3}
                        className="rounded-[4px] border p-[8px] w-full bg-neutral-50"
                        disabled
                    />
                )}
            </div>

            <button
                type="button"
                className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                onClick={() => removeRow(selectedKey)}
            >
                Видалити
            </button>
        </div>
    );
}
