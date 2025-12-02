import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import {ReactNode} from "react";

export const metadata: Metadata = { title: "SEO Tools" };

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="uk" className="bg-[#fafafa] text-[#171717]">
        <body className="min-h-[100vh]">
        <Header />
        <main className="mx-auto max-w-[1024px] p-[24px]">
            {children}
        </main>
        </body>
        </html>
    );
}
