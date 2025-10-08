// components/validator_json/forms/bonus/BonusAboutPrimaryForm.tsx
"use client";

import { JSX } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

type RowProps = {
    label: string;
    name: string;
    as?: "input" | "textarea";
};

type Props = {
    RowComponent: (p: RowProps) => JSX.Element;
    control: Control;
    registerAction: UseFormRegister<any>;
};

const BonusAboutPrimaryForm = ({ RowComponent, control, registerAction }: Props) => {
    const welcomeFA = useFieldArray({ control, name: "welcomeBreakdown" as any });
    const otherFA = useFieldArray({ control, name: "otherList" as any });

    useEffect(() => {
        if (welcomeFA.fields.length === 0) welcomeFA.append("");
    }, [welcomeFA.fields.length]);

    useEffect(() => {
        if (otherFA.fields.length === 0) otherFA.append("");
    }, [otherFA.fields.length]);

    return (
        <div className="space-y-[12px]">
            <RowComponent label="image1" name="image1" />
            <RowComponent label="intro" name="intro" as="textarea" />
            <RowComponent label="welcomeTitle" name="welcomeTitle" />
            <RowComponent label="image2" name="image2" />
            <RowComponent label="welcomeText" name="welcomeText" as="textarea" />

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">welcomeBreakdown</div>
                {welcomeFA.fields.map((f, idx) => (
                    <div key={f.id} className="flex items-center gap-[8px]">
                        <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`welcomeBreakdown.${idx}`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => welcomeFA.remove(idx)}>×</button>
                    </div>
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => welcomeFA.append("")}>
                    Додати рядок
                </button>
            </div>

            <RowComponent label="highrollerTitle" name="highrollerTitle" />
            <RowComponent label="highrollerText" name="highrollerText" as="textarea" />
            <RowComponent label="otherTitle" name="otherTitle" />
            <RowComponent label="otherText" name="otherText" as="textarea" />

            <div className="rounded-[6px] border p-[12px] space-y-[8px]">
                <div className="text-[14px] leading-[20px] font-medium">otherList</div>
                {otherFA.fields.map((f, idx) => (
                    <div key={f.id} className="flex items-center gap-[8px]">
                        <input className="w-full rounded-[4px] border p-[8px]" {...registerAction(`otherList.${idx}`)} />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => otherFA.remove(idx)}>×</button>
                    </div>
                ))}
                <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => otherFA.append("")}>
                    Додати рядок
                </button>
            </div>
        </div>
    );
};

export default BonusAboutPrimaryForm;
