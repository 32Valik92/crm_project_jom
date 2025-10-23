import Link from "next/link";

export default function Home() {
    return (
        <section className="space-y-[16px]">
            <h1 className="text-[24px] font-bold leading-[32px]">Інструменти</h1>

            <div className="grid sm:grid-cols-2 gap-[16px]">
                <Link
                    href="/validator"
                    className="block rounded-[16px] border bg-white p-[20px] hover:shadow-sm transition"
                >
                    <div className="text-[18px] font-semibold mb-[4px] leading-[28px]">Валідатор JSON</div>
                    <p className="text-[14px] leading-[20px] text-[#525252]">
                        Форми для заповнення та валідації блоків, експорт у ZIP.
                    </p>
                </Link>
            </div>
        </section>
    );
}
