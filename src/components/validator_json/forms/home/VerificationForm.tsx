// src/components/validator_json/forms/home/VerificationForm.tsx
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
        ["rounded-[4px] border p-[8px] w-full", bad ? "border-[#dc2626]" : ""].join(" ");

    return (
        <div className="space-y-[12px]">
            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className={cls(!!err("title"))} {...registerAction("title")} />
                {!!err("title") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">
            {String(err("title")?.message)}
          </span>
                )}
            </div>

            <div className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">text</span>
                <textarea className={cls(!!err("text"))} rows={5} {...registerAction("text")} />
                {!!err("text") && (
                    <span className="text-[12px] leading-[16px] text-[#dc2626]">
            {String(err("text")?.message)}
          </span>
                )}
            </div>
        </div>
    );
}
