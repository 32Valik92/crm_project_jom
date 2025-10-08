// src/components/validator_json/BlockFormDialog.tsx (повна заміна — прибрано `values`, додано reset після submit)
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BlockKey } from "@/lib/schemas";

import AboutPrimaryForm from "@/components/validator_json/forms/AboutPrimaryForm";
import AppAboutPrimaryForm from "@/components/validator_json/forms/AppAboutPrimaryForm";
import MobileAppForm from "./forms/MobileAppForm";
import BonusAboutPrimaryForm from "./forms/bonus/BonusAboutPrimaryForm";
import BonusBonusesForm from "./forms/bonus/BonusBonusesForm";
import BonusHeroForm from "./forms/bonus/BonusHeroForm";
import BonusCashbackAboutPrimaryForm from "./forms/bonus_cashback/BonusCashbackAboutPrimaryForm";
import BonusDepositAboutPrimaryForm from "./forms/bonus_deposit/AboutPrimaryForm";
import BonusDepositBonusesForm from "./forms/bonus_deposit/BonusesForm";
import BonusFreebetAboutPrimaryForm from "@/components/validator_json/forms/bonus_freebet/AboutPrimaryForm";
import BonusFreebetBonusesForm from "@/components/validator_json/forms/bonus_freebet/BonusesForm";

/** ---------- API ---------- */
type Props = {
    schema: any | null;
    block: BlockKey | "";
    initialValues: any;
    onCancel: () => void;
    onSave: (v: any) => void;
};

const BlockFormDialog = ({ schema, block, initialValues, onCancel, onSave }: Props) => {
    return (
        <dialog id="formDialog" className="rounded-[12px] p-[0px]">
            <FormContent
                schema={schema}
                block={block}
                initialValues={initialValues}
                onCancel={onCancel}
                onSave={onSave}
            />
        </dialog>
    );
};

export default BlockFormDialog;

/** ---------- ВНУТРІШНЄ ВМІСТ ДІАЛОГУ ---------- */
function FormContent({ schema, block, initialValues, onCancel, onSave }: Props) {
    const form = useForm<any>({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: initialValues, // лише дефолти; без values, щоб форма не "памʼятала"
    });

    if (!block) return null;

    const { register, handleSubmit, control, formState: { errors }, reset } = form;

    type RowProps = { label: string; name: string; as?: "input" | "textarea" };
    const Row = ({ label, name, as = "input" }: RowProps) => (
        <label className="flex flex-col gap-[4px]">
            <span className="text-[12px] leading-[16px] text-[#525252]">{label}</span>
            {as === "input" ? (
                <input className="rounded-[4px] border p-[8px]" {...register(name)} />
            ) : (
                <textarea className="rounded-[4px] border p-[8px]" rows={4} {...register(name)} />
            )}
            {(errors as any)?.[name]?.message && (
                <span className="text-[12px] leading-[16px] text-[#dc2626]">
          {String((errors as any)[name].message)}
        </span>
            )}
        </label>
    );

    const onSubmit = handleSubmit((values) => {
        onSave(values);
        console.log(222)
        reset();
    });

    return (
        <form onSubmit={onSubmit} className="w-[90vw] max-w-[768px] space-y-[16px] p-[24px]">
            <h3 className="text-[18px] font-semibold leading-[28px]">{block}</h3>

            {block === "about_primary" && <AboutPrimaryForm RowComponent={Row} />}
            {block === "app_about_primary" && <AppAboutPrimaryForm RowComponent={Row} />}
            {block === "mobile_app" && (
                <MobileAppForm control={control} registerAction={register} />
            )}

            {block === "bonus_about_primary" && (
                <BonusAboutPrimaryForm RowComponent={Row} control={control} registerAction={register} />
            )}
            {block === "bonus_bonuses" && (
                <BonusBonusesForm control={control} registerAction={register} />
            )}
            {block === "bonus_hero" && <BonusHeroForm RowComponent={Row} />}

            {block === "bonus_cashback_about_primary" && (
                <BonusCashbackAboutPrimaryForm control={control} registerAction={register} />
            )}

            {block === "bonus_deposit_about_primary" && (
                <BonusDepositAboutPrimaryForm control={control} registerAction={register} />
            )}
            {block === "bonus_deposit_bonuses" && (
                <BonusDepositBonusesForm control={control} registerAction={register} />
            )}

            {block === "bonus_freebet_about_primary" && (
                <BonusFreebetAboutPrimaryForm control={control} registerAction={register} />
            )}
            {block === "bonus_freebet_bonuses" && (
                <BonusFreebetBonusesForm control={control} registerAction={register} />
            )}

            <div className="flex justify-end gap-[12px] pt-[8px]">
                <button type="button" className="rounded-[4px] border px-[16px] py-[8px]" onClick={onCancel}>
                    Скасувати
                </button>
                <button type="submit" className="rounded-[4px] bg-[#000000] px-[16px] py-[8px] text-[#ffffff]">
                    Зберегти блок
                </button>
            </div>
        </form>
    );
}
