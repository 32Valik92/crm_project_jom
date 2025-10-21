"use client";

import { type UseFormRegister } from "react-hook-form";

type Props = { registerAction: UseFormRegister<any> };

export default function SlotsHeroForm({ registerAction }: Props) {
    return (
        <div className="space-y-4 rounded-xl border border-slate-700 bg-slate-800 p-4">
            {/* badge */}
            <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-100 uppercase tracking-wide">
          badge
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="Напр.: Акція тижня"
                    {...registerAction("badge")}
                />
            </label>

            {/* title */}
            <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-100 uppercase tracking-wide">
          title
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="Заголовок героя"
                    {...registerAction("title")}
                />
            </label>

            {/* cta */}
            <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-100 uppercase tracking-wide">
          cta
        </span>
                <input
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="Напр.: Зареєструватися"
                    {...registerAction("cta")}
                />
            </label>

            {/* description */}
            <label className="flex flex-col gap-2">
        <span className="text-xs font-medium text-slate-100 uppercase tracking-wide">
          description
        </span>
                <textarea
                    rows={4}
                    className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                    placeholder="Короткий опис пропозиції"
                    {...registerAction("description")}
                />
            </label>
        </div>
    );
}
