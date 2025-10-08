"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/ui/nav";

export default function Header() {
    const pathname = usePathname();

    return (
        <div className="border-b bg-white">
            <div className="mx-auto max-w-[1024px] flex items-center justify-between p-[16px]">
                <Link href="/" className="font-semibold text-[16px] leading-[24px]">SEO Tools</Link>

                <nav className="flex items-center gap-[8px]">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.startsWith
                            ? pathname.startsWith(item.href)
                            : pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "rounded-[4px] px-[12px] py-[4px] transition",
                                    isActive
                                        ? "font-semibold underline underline-offset-[4px]"
                                        : "hover:bg-[#f5f5f5]"
                                ].join(" ")}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
