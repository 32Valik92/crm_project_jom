// src/components/validator_json/forms/sportsbook/HeroForm.tsx
"use client";

import { type UseFormRegister } from "react-hook-form";

type Props = { registerAction: UseFormRegister<any> };

export default function HomeHeroForm({ registerAction }: Props) {
    return (
        <div className="space-y-[12px]">
            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">badge</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("badge")} />
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">title</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("title")} />
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">cta</span>
                <input className="rounded-[4px] border p-[8px]" {...registerAction("cta")} />
            </label>

            <label className="flex flex-col gap-[4px]">
                <span className="text-[12px] leading-[16px] text-[#525252]">description</span>
                <textarea className="rounded-[4px] border p-[8px]" rows={4} {...registerAction("description")} />
            </label>
        </div>
    );
}
