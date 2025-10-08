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
            sourceTemplate.nav.forEach((n: any, i: number) => {
                navFA.append({
                    id: n.id,
                    label: n.label ?? "",
                    redirect: n.redirect ?? true,
                    children: n.children?.map((c: any) => ({ id: c.id, label: c.label ?? "", redirect: c.redirect ?? true })) ?? [],
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">brand</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("brand")} />
            </label>

            <div className="grid md:grid-cols-2 gap-[8px]">
                <Input label="actions.login" name="actions.login" registerAction={registerAction} />
                <Input label="actions.signup" name="actions.signup" registerAction={registerAction} />
                <Input label="actions.support" name="actions.support" registerAction={registerAction} />
                <Input label="actions.language" name="actions.language" registerAction={registerAction} />
            </div>

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">mobile.featured</div>
                {mobileFeaturedFA.fields.map((f, idx) => (
                    <div className="flex items-center gap-[8px]" key={f.id}>
                        <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`mobile.featured.${idx}`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => mobileFeaturedFA.remove(idx)}>×</button>
                    </div>
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => mobileFeaturedFA.append("")}>
                    Додати item
                </button>
            </div>

            <div className="rounded-[6px] border p-[12px] space-y-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">nav</div>
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

function Input({ label, name, registerAction }: { label: string; name: string; registerAction: UseFormRegister<any> }) {
    return (
        <label className="flex flex-col gap-[4px]">
            <span className="text-[12px] leading-[16px] text-[#525252]">{label}</span>
            <input className="rounded-[4px] border p-[8px]" {...registerAction(name)} />
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
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <div className="grid md:grid-cols-2 gap-[8px]">
                <div className="rounded-[4px] border p-[8px] text-[12px] leading-[16px] bg-neutral-50">{String(id)}</div>
                <input className="rounded-[4px] border p-[8px]" placeholder="label" {...registerAction(`nav.${nIdx}.label`)} />
            </div>

            {childrenFA.fields.length > 0 && (
                <div className="space-y-[8px]">
                    <div className="text-[12px] leading-[16px] font-medium">children</div>
                    {childrenFA.fields.map((c, cIdx) => (
                        <div key={c.id} className="grid md:grid-cols-2 gap-[8px]">
                            <div className="rounded-[4px] border p-[8px] text-[12px] leading-[16px] bg-neutral-50">{String(templateItem?.children?.[cIdx]?.id ?? "")}</div>
                            <input className="rounded-[4px] border p-[8px]" placeholder="label" {...registerAction(`nav.${nIdx}.children.${cIdx}.label`)} />
                        </div>
                    ))}
                </div>
            )}

            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={onRemove}>
                Видалити пункт
            </button>
        </div>
    );
}
