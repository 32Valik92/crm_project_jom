"use client";

import {useEffect} from "react";
import {type Control, useFieldArray, type UseFormRegister} from "react-hook-form";

type Props = {
    control: Control;
    registerAction: UseFormRegister<any>;
    namePrefix: string;
    addLabel: string;
};

const StepsArray = ({control, registerAction, namePrefix, addLabel}: Props) => {
    // Підключаємо масив за вказаним шляхом namePrefix
    // Напр.: namePrefix = "cards.0.steps" -> редагуємо steps усередині нульової картки
    const {fields, append, remove} = useFieldArray({
        control,
        // RHF очікує точний шлях як generic; якщо типи строгі — задай Control<Schema> і прибери 'as any'
        name: namePrefix as any,
    });

    // Гарантуємо, що масив ніколи не порожній: автододаємо 1 елемент
    useEffect(() => {
        if (fields.length === 0) {
            append(""); // Додаємо пустий рядок (крок/пункт)
        }
    }, [fields.length, append]);

    return (
        <div className="bg-[#fafafa] rounded-[6px] p-[8px] space-y-[8px]">
            {/* Рендеримо кожний елемент масиву як input + кнопка видалення */}
            {fields.map((f, idx) => (
                <div key={f.id} className="flex items-center gap-[8px]">
                    {/* Регіструємо поле за індексом у масиві:
                        namePrefix = "cards.0.steps" -> "cards.0.steps.0" | "cards.0.steps.1" ... */}
                    <input
                        className="w-full rounded-[4px] border p-[8px] text-[16px] leading-[24px]"
                        {...registerAction(`${namePrefix}.${idx}`)}
                    />
                    <button
                        type="button"
                        className="text-[12px] leading-[16px] underline"
                        onClick={() => remove(idx)}
                        aria-label="Видалити"
                        title="Видалити"
                    >
                        ×
                    </button>
                </div>
            ))}

            {/* Додати новий елемент у кінець масиву */}
            <button
                type="button"
                className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]"
                onClick={() => append("")}
            >
                {addLabel}
            </button>
        </div>
    );
}

export default StepsArray;
