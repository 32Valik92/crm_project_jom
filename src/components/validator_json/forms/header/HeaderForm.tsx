// src/components/validator_json/forms/header/HeaderForm.tsx
"use client";

import { useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray, useWatch } from "react-hook-form";

export default function HeaderForm({
                                       control,
                                       registerAction,
                                       sourceTemplate,
                                   }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    sourceTemplate?: any;
}) {
    const mobileFeaturedFA = useFieldArray({ control, name: "mobile.featured" as any });
    const navFA = useFieldArray({ control, name: "nav" as any });

    useEffect(() => {
        if (mobileFeaturedFA.fields.length === 0) mobileFeaturedFA.append("");
        if (navFA.fields.length === 0 && sourceTemplate?.nav?.length)
            sourceTemplate.nav.forEach((n: any) => {
                navFA.append({
                    id: n.id,
                    label: n.label ?? "",
                    redirect: n.redirect ?? true,
                    children:
                        n.children?.map((c: any) => ({
                            id: c.id,
                            label: c.label ?? "",
                            redirect: c.redirect ?? true,
                        })) ?? [],
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-4">
            {/* brand */}
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">brand</span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    {...registerAction("brand")}
                />
            </label>

            {/* actions */}
            <div className="grid gap-3 md:grid-cols-2">
                <Input label="actions.login" name="actions.login" registerAction={registerAction} />
                <Input label="actions.signup" name="actions.signup" registerAction={registerAction} />
                <Input label="actions.support" name="actions.support" registerAction={registerAction} />
                <Input label="actions.language" name="actions.language" registerAction={registerAction} />
            </div>

            {/* mobile.featured */}
            <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">mobile.featured</div>
                {mobileFeaturedFA.fields.map((f, idx) => (
                    <div className="flex items-center gap-2" key={f.id}>
                        <input
                            className="w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                            {...registerAction(`mobile.featured.${idx}`)}
                        />
                        <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                            onClick={() => mobileFeaturedFA.remove(idx)}
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                    onClick={() => mobileFeaturedFA.append("")}
                >
                    Додати item
                </button>
            </div>

            {/* nav */}
            <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4 shadow-md">
                <div className="text-sm font-semibold text-slate-100">nav</div>
                {navFA.fields.map((n, nIdx) => (
                    <NavItemEditor
                        key={n.id}
                        control={control}
                        registerAction={registerAction}
                        nIdx={nIdx}
                        templateItem={sourceTemplate?.nav?.[nIdx]}
                        onRemove={() => navFA.remove(nIdx)}
                    />
                ))}
            </div>
        </div>
    );
}

function Input({
                   label,
                   name,
                   registerAction,
               }: {
    label: string;
    name: string;
    registerAction: UseFormRegister<any>;
}) {
    return (
        <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-100">{label}</span>
            <input
                className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                {...registerAction(name)}
            />
        </label>
    );
}

function NavItemEditor({
                           control,
                           registerAction,
                           nIdx,
                           templateItem,
                           onRemove,
                       }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    nIdx: number;
    templateItem?: any;
    onRemove: () => void;
}) {
    const childrenFA = useFieldArray({ control, name: `nav.${nIdx}.children` as any });
    const id = useWatch({ control, name: `nav.${nIdx}.id` }) ?? templateItem?.id;

    useEffect(() => {
        if (!childrenFA.fields.length && templateItem?.children?.length) {
            templateItem.children.forEach((c: any) =>
                childrenFA.append({ id: c.id, label: c.label ?? "", redirect: c.redirect ?? true })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [templateItem?.children?.length]);

    return (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
            <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-200">
                    {String(id)}
                </div>
                <input
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="label"
                    {...registerAction(`nav.${nIdx}.label`)}
                />
            </div>

            {childrenFA.fields.length > 0 && (
                <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-200">children</div>
                    {childrenFA.fields.map((c, cIdx) => (
                        <div key={c.id} className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-200">
                                {String(templateItem?.children?.[cIdx]?.id ?? "")}
                            </div>
                            <input
                                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                                placeholder="label"
                                {...registerAction(`nav.${nIdx}.children.${cIdx}.label`)}
                            />
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-red-700 hover:border-red-700"
                onClick={onRemove}
            >
                Видалити пункт
            </button>
        </div>
    );
}
