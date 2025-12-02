"use client";

import { type UseFormRegister } from "react-hook-form";

export default function HomeVerificationForm({
                                                 registerAction,
                                                 errors,
                                             }: {
    registerAction: UseFormRegister<any>;
    errors?: any;
}) {
    const err = (p: string) => p.split(".").reduce((a, k) => (a ? a[k] : undefined), errors ?? {});
    const cls = (bad: boolean) =>
        [
            "rounded-md border px-3 py-2 w-full",
            "bg-slate-900 border-slate-600 text-slate-50 outline-none",
            "focus:border-sky-500 focus:ring-2 focus:ring-sky-500",
            bad ? "border-red-600" : "",
        ].join(" ");

    return (
        <div className="space-y-4">
            
            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-xs text-red-500">{String(err("title")?.message)}</span>
                )}
            </div>

            <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide">text</span>
                <textarea className={cls(!!err("text"))} rows={5} {...registerAction("text")} />
                {!!err("text") && (
                    <span className="text-xs text-red-500">{String(err("text")?.message)}</span>
                )}
            </div>
        </div>
    );
}
