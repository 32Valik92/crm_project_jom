"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BlockKey } from "@/lib/schemas";

import AboutPrimaryForm from "@/components/validator_json/forms/AboutPrimaryForm";
import AppAboutPrimaryForm from "@/components/validator_json/forms/AppAboutPrimaryForm";
import MobileAppForm from "./forms/MobileAppForm";

/** ---------- API ---------- */
type Props = {
    schema: any | null;             // ZodSchema або null (для блоків без валідації)
    block: BlockKey | "";           // Ключ вибраного блоку або порожньо (коли блок не вибрано)
    initialValues: any;             // Початкові значення форми (драфт для поточного блоку)
    onCancel: () => void;           // Колбек при закритті діалогу без збереження
    onSave: (v: any) => void;       // Колбек при сабміті (повертає валідні дані блоку)
};

const BlockFormDialog = ({ schema, block, initialValues, onCancel, onSave }: Props) => {
    return (
        // <dialog> — нативне модальне вікно, яким керує зовнішній код через .showModal()/.close()
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
}

export default BlockFormDialog;

/** ---------- ВНУТРІШНЄ ВМІСТ ДІАЛОГУ ---------- */
function FormContent({ schema, block, initialValues, onCancel, onSave }: Props) {

    // Ініціалізуємо RHF-форму:
    // - resolver: підключаємо Zod для синхронної валідації (якщо схема є)
    // - defaultValues: початкові значення для неконтрольованих інпутів
    // - values: примусово синхронізуємо значення з пропсів (корисно, коли відкриваємо дrafт)
    //   ВАЖЛИВО: використання "values" робить інпути контрольованими RHF; якщо initialValues змінюються —
    //   форма автоматично відобразить нові значення.
    const form = useForm<any>({
        resolver: schema ? zodResolver(schema) : undefined,
        defaultValues: initialValues,
        values: initialValues, // щоб підхоплювати драфт при відкритті
    });

    if (!block) return null;

    const { register, handleSubmit, control, formState: { errors } } = form;

    // Дрібний допоміжний компонент для простих рядків (input/textarea)
    type RowProps = { label: string; name: string; as?: "input" | "textarea" };
    const Row = ({ label, name, as = "input" }: RowProps) => (
        <label className="flex flex-col gap-[4px]">
            <span className="text-[12px] leading-[16px] text-[#525252]">{label}</span>

            {/* Регіструємо поле: name — це шлях у форм-стейті (може бути вкладеним: "miniGame.title") */}
            {as === "input" ? (
                <input className="rounded-[4px] border p-[8px]" {...register(name)} />
            ) : (
                <textarea className="rounded-[4px] border p-[8px]" rows={4} {...register(name)} />
            )}

            {/* Відображаємо помилку під полем, якщо схема згенерувала message */}
            {/*
              Зауваження: errors має вкладену структуру, тож прямий доступ через errors[name]
              працює лише як any-доступ. Для безпечного доступу можна використати утиліту
              з "object-path" або свій get(). Тут зберігаємо твою поточну логіку.
            */}
            {(errors)?.[name]?.message && (
                <span className="text-[12px] leading-[16px] text-[#dc2626]">{String((errors)[name].message)}</span>
            )}
        </label>
    );

    return (
        <form onSubmit={handleSubmit(onSave)} className="w-[90vw] max-w-[768px] space-y-[16px] p-[24px]">
            <h3 className="text-[18px] font-semibold leading-[28px]">{block}</h3>

            {/* Рендер специфічної форми залежно від типу блоку:
               - Простим блокам передаємо RowComponent для рендеру полів
               - Складним (з масивами/вкладами) — передаємо control + register для RHF */}
            {block === "about_primary" && <AboutPrimaryForm RowComponent={Row} />}

            {block === "app_about_primary" && <AppAboutPrimaryForm RowComponent={Row} />}

            {block === "mobile_app" && (
                <MobileAppForm
                    control={control}              // для useFieldArray усередині MobileAppForm
                    registerAction={register}      // щоб реєструвати прості поля
                />
            )}

            {/* Кнопки керування в діалозі */}
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
