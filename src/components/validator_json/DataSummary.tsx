"use client"; // Компонент рендериться на стороні клієнта (Next.js Client Component)

import type { AnyBlockValue, BlockKey } from "@/lib/schemas";

type Props = {
    data: Partial<Record<BlockKey, AnyBlockValue>>;
    BLOCK_META: Record<BlockKey, { label: string; file: string }>;
};

const DataSummary = ({ data, BLOCK_META }: Props)=> {
    // Визначаємо порядок блоків, у якому вони відображаються
    const order: BlockKey[] = ["about_primary", "app_about_primary", "mobile_app"];

    return (
        <section className="rounded border bg-white p-4">
            <h2 className="mb-3 font-semibold">Поточні дані</h2>

            <ul className="space-y-1 text-sm">
                {order.map((b) => (
                    <li key={b}>
                        <span className="font-medium">{BLOCK_META[b].label}:</span>{" "}
                        {data[b] ? "заповнено ✅" : "порожньо"}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DataSummary;