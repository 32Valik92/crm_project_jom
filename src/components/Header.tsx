"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/ui/nav";
import { motion } from "framer-motion";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b1220]/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 py-3 sm:py-4">
                <Link
                    href="/"
                    className="relative text-lg font-bold tracking-tight text-sky-300 transition-transform hover:scale-[1.05]"
                >
                    SEO<span className="text-white">Tools</span>
                    <span className="absolute -bottom-[2px] left-0 h-[2px] w-full bg-sky-400/60 scale-x-0 transition-transform group-hover:scale-x-100 origin-left"></span>
                </Link>

                <nav className="flex items-center gap-1 sm:gap-2 text-sm">
                    {NAV_ITEMS.map((item, i) => {
                        const isActive = item.startsWith
                            ? pathname.startsWith(item.href)
                            : pathname === item.href;

                        return (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                            >
                                <Link
                                    href={item.href}
                                    className={[
                                        "relative rounded-xl px-3 py-1.5 font-medium transition-all duration-300",
                                        isActive
                                            ? "text-sky-300 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-6 after:rounded-full after:bg-sky-400"
                                            : "text-slate-300 hover:text-sky-200 hover:bg-white/5",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
