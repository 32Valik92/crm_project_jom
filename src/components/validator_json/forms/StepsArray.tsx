
"use client";

import { useEffect } from "react";
import { type Control, useFieldArray, type UseFormRegister } from "react-hook-form";

type Props = {
    control: Control;
    registerAction: UseFormRegister<any>;
    namePrefix: string;
    addLabel: string;
};

const StepsArray = ({ control, registerAction, namePrefix, addLabel }: Props) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: namePrefix as any,
    });


    useEffect(() => {
        if (fields.length === 0) {
            append("");
        }
    }, [fields.length, append]);

    const inputCls =
        [
            "w-full rounded-md border px-3 py-2",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
        ].join(" ");

    return (
        <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
            {fields.map((f, idx) => (
                <div key={f.id} className="flex items-center gap-2">
                    <input
                        className={inputCls}
                        {...registerAction(`${namePrefix}.${idx}`)}
                    />
                    <button
                        type="button"
                        className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:bg-red-700"
                        onClick={() => remove(idx)}
                        aria-label="Видалити"
                        title="Видалити"
                    >
                        ×
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-slate-700"
                onClick={() => append("")}
            >
                {addLabel}
            </button>
        </div>
    );
};

export default StepsArray;
