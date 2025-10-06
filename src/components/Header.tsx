"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/ui/nav";

export default function Header() {
    const pathname = usePathname();

    return (
        <div className="border-b bg-white">
            <div className="mx-auto max-w-5xl flex items-center justify-between p-4">
                <Link href="/" className="font-semibold">SEO Tools</Link>

                <nav className="flex items-center gap-2">
                    {NAV_ITEMS.map((item) => {
                        const isActive = item.startsWith
                            ? pathname.startsWith(item.href)
                            : pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    "rounded px-3 py-1 transition",
                                    isActive ? "font-semibold underline underline-offset-4" : "hover:bg-neutral-100"
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
