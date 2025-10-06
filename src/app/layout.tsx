import "./globals.css";
import {Metadata} from "next";

export const metadata:Metadata = { title: "JSON CRM Generator" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="uk">
        <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <div className="mx-auto max-w-5xl p-6">{children}</div>
        </body>
        </html>
    );
}

