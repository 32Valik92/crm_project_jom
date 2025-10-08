// components/validator_json/forms/bonus/BonusBonusesForm.tsx
"use client";

import { JSX, useEffect } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";

type RowProps = { label: string; name: string; as?: "input" | "textarea" };
type Props = { control: Control; registerAction: UseFormRegister<any>; RowComponent?: (p: RowProps) => JSX.Element };

export default function BonusBonusesForm({ control, registerAction }: Props) {
    const tabsFA = useFieldArray({ control, name: "tabs" as any });
    const cardsFA = useFieldArray({ control, name: "cards" as any });

    useEffect(() => {
        if (tabsFA.fields.length === 0) tabsFA.append("");
        if (cardsFA.fields.length === 0) cardsFA.append({ title: "", subtitle: "", items: [{ label: "", value: "" }], ctaLabel: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("title")} />
            </label>

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">tabs</div>
                {tabsFA.fields.map((f, idx) => (
                    <div className="flex items-center gap-[8px]" key={f.id}>
                        <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`tabs.${idx}`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => tabsFA.remove(idx)}>×</button>
                    </div>
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => tabsFA.append("")}>
                    Додати таб
                </button>
            </div>

            <div className="rounded-[6px] border p-[12px] space-y-[12px]">
                <div className="text-[14px] leading-[20px] font-medium">cards</div>

                {cardsFA.fields.map((card, cIdx) => (
                    <CardEditor
                        key={card.id}
                        control={control}
                        registerAction={registerAction}
                        cIdx={cIdx}
                        onRemove={() => cardsFA.remove(cIdx)}
                    />
                ))}

                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => cardsFA.append({ title: "", subtitle: "", items: [{ label: "", value: "" }], ctaLabel: "" })}
                >
                    Додати картку
                </button>
            </div>

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">promocode</div>
                <div className="grid md:grid-cols-2 gap-[8px]">
                    <input className="rounded-[4px] border p-[8px]" placeholder="label" {...registerAction("promocode.label")} />
                    <input className="rounded-[4px] border p-[8px]" placeholder="code" {...registerAction("promocode.code")} />
                    <input className="rounded-[4px] border p-[8px]" placeholder="cta" {...registerAction("promocode.cta")} />
                    <input className="rounded-[4px] border p-[8px]" placeholder="copied" {...registerAction("promocode.copied")} />
                    <input className="rounded-[4px] border p-[8px]" placeholder="ariaCopy" {...registerAction("promocode.ariaCopy")} />
                </div>
            </div>
        </div>
    );
}

function CardEditor({
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
    const itemsFA = useFieldArray({ control, name: `cards.${cIdx}.items` as any });

    useEffect(() => {
        if (itemsFA.fields.length === 0) itemsFA.append({ label: "", value: "" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cIdx]);

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[8px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">cards[{cIdx}].title</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`cards.${cIdx}.title`)} />
            </label>
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">cards[{cIdx}].subtitle</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`cards.${cIdx}.subtitle`)} />
            </label>

            <div className="space-y-[8px]">
                <div className="text-[12px] leading-[16px] font-medium">items</div>
                {itemsFA.fields.map((it, iIdx) => (
                    <div className="grid grid-cols-2 gap-[8px]" key={it.id}>
                        <input className="rounded-[4px] border p-[8px]" placeholder="label" {...registerAction(`cards.${cIdx}.items.${iIdx}.label`)} />
                        <div className="flex items-center gap-[8px]">
                            <input className="w-full rounded-[4px] border p-[8px]" placeholder="value" {...registerAction(`cards.${cIdx}.items.${iIdx}.value`)} />
                            <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => itemsFA.remove(iIdx)}>×</button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                    onClick={() => itemsFA.append({ label: "", value: "" })}
                >
                    Додати item
                </button>
            </div>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">cards[{cIdx}].ctaLabel</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction(`cards.${cIdx}.ctaLabel`)} />
            </label>

            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={onRemove}>
                Видалити картку
            </button>
        </div>
    );
}
