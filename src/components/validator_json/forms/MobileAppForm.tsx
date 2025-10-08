"use client";

import { useEffect } from "react";
import { useFieldArray, type Control, type UseFormRegister } from "react-hook-form";
import { AppMobileApp } from "@/lib/schemas";
import StepsArray from "@/components/validator_json/forms/StepsArray";

// - control: інстанс RHF control для підключення useFieldArray
// - registerAction: функція реєстрації полів (alias для register)
type Props = {
    control: Control; // Можна звузити до Control<AppMobileApp> для кращої типізації
    registerAction: UseFormRegister<AppMobileApp>;
};

const MobileAppForm = ({ control, registerAction }: Props) => {
    // Масив карток: cards: { title: string; steps: string[] }[]
    const { fields: cardFields, append: addCard, remove: delCard } = useFieldArray({
        control,
        name: "cards", // шлях у форм-стейті
    });

    // Вкладений масив: compare.rows: { label: string; items: string[] }[]
    const { fields: rowFields, append: addRow, remove: delRow } = useFieldArray({
        control,
        name: "compare.rows", // шлях до глибоко вкладеного масиву
    });

    // Гарантуємо мінімум 1 картку при маунті/очищенні
    useEffect(() => {
        if (cardFields.length === 0) {
            // нова карта з пустим заголовком та одним кроком
            addCard({ title: "", steps: [""] });
        }
    }, [cardFields.length, addCard]);

    // Гарантуємо мінімум 1 рядок у compare.rows
    useEffect(() => {
        if (rowFields.length === 0) {
            addRow({ label: "", items: [""] });
        }
    }, [rowFields.length, addRow]);

    return (
        <div className="space-y-4">
            {/* Заголовок (brand + tail) */}
            <div className="grid gap-2 rounded border p-3">
                <span className="text-sm font-medium">title</span>
                {/* title.brand */}
                <input
                    className="rounded border p-2"
                    {...registerAction("title.brand")}
                    placeholder="brand"
                />
                {/* title.tail */}
                <input
                    className="rounded border p-2"
                    {...registerAction("title.tail")}
                    placeholder="tail"
                />
            </div>

            {/* Короткий вступний текст lead */}
            <label className="flex flex-col gap-1">
                <span className="text-xs text-neutral-600">lead</span>
                <textarea
                    className="rounded border p-2"
                    rows={3}
                    {...registerAction("lead")}
                />
            </label>

            {/* ---- Блок Cards ---- */}
            <div className="rounded border p-3 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">cards</span>
                    {/* Додати ще одну картку */}
                    <button
                        type="button"
                        className="rounded border px-2 py-1 text-sm"
                        onClick={() => addCard({ title: "", steps: [""] })}
                    >
                        + Додати картку
                    </button>
                </div>

                {/* Перелік існуючих карток */}
                {cardFields.map((cf, i) => (
                    <div key={cf.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">Картка #{i + 1}</span>
                            {/* Видалити картку */}
                            <button
                                type="button"
                                className="text-xs underline"
                                onClick={() => delCard(i)}
                            >
                                Видалити
                            </button>
                        </div>

                        {/* Заголовок картки */}
                        <input
                            className="rounded border p-2 w-full mb-2"
                            {...registerAction(`cards.${i}.title`)}
                            placeholder="title"
                        />

                        {/* Масив кроків для картки i.
                            StepsArray відповідає лише за простий масив рядків (steps: string[]) */}
                        <StepsArray
                            control={control}
                            registerAction={registerAction}
                            namePrefix={`cards.${i}.steps`}
                            addLabel="+ Додати крок"
                        />
                    </div>
                ))}
            </div>

            {/* ---- Блок Compare ---- */}
            <div className="rounded border p-3 space-y-3">
                {/* Заголовок секції compare */}
                <label className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-600">compare.title</span>
                    <input
                        className="rounded border p-2"
                        {...registerAction("compare.title")}
                    />
                </label>

                {/* Керування масивом compare.rows */}
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">compare.rows</span>
                    {/* Додати новий рядок порівняння */}
                    <button
                        type="button"
                        className="rounded border px-2 py-1 text-sm"
                        onClick={() => addRow({ label: "", items: [""] })}
                    >
                        + Додати рядок
                    </button>
                </div>

                {/* Перелік рядків у порівнянні */}
                {rowFields.map((rf, i) => (
                    <div key={rf.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">Рядок #{i + 1}</span>
                            {/* Видалити рядок */}
                            <button
                                type="button"
                                className="text-xs underline"
                                onClick={() => delRow(i)}
                            >
                                Видалити
                            </button>
                        </div>

                        {/* Назва/мітка рядка */}
                        <input
                            className="rounded border p-2 w-full mb-2"
                            {...registerAction(`compare.rows.${i}.label`)}
                            placeholder="label"
                        />

                        {/* Масив пунктів для рядка i (items: string[]) */}
                        <StepsArray
                            control={control}
                            registerAction={registerAction}
                            namePrefix={`compare.rows.${i}.items`}
                            addLabel="+ Додати пункт"
                        />
                    </div>
                ))}
            </div>

            {/* Заклик до дії (cta) */}
            <label className="flex flex-col gap-1">
                <span className="text-xs text-neutral-600">cta</span>
                <input className="rounded border p-2" {...registerAction("cta")} />
            </label>
        </div>
    );
}

export default MobileAppForm;