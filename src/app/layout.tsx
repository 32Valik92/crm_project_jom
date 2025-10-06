import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "SEO Tools" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk" className="bg-neutral-50 text-neutral-900">
        <body className="min-h-dvh">
        <Header />
        <main className="mx-auto max-w-5xl p-6">{children}</main>
        </body>
        </html>
    );
}
