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
        <div className="bg-neutral-50 rounded-md p-2 space-y-2">
            {/* Рендеримо кожний елемент масиву як input + кнопка видалення */}
            {fields.map((f, idx) => (
                <div key={f.id} className="flex items-center gap-2">
                    {/* Регіструємо поле за індексом у масиві:
                        namePrefix = "cards.0.steps" -> "cards.0.steps.0" | "cards.0.steps.1" ... */}
                    <input
                        className="w-full rounded border p-2"
                        {...registerAction(`${namePrefix}.${idx}`)}
                    />
                    <button
                        type="button"
                        className="text-xs underline"
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
                className="rounded border px-2 py-1 text-xs"
                onClick={() => append("")}
            >
                {addLabel}
            </button>
        </div>
    );
}

export default StepsArray;