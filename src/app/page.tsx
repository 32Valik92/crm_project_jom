export default function Home() {
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-bold">Інструменти</h1>

            <div className="grid sm:grid-cols-2 gap-4">
                <a
                    href="/validator"
                    className="block rounded-2xl border bg-white p-5 hover:shadow-sm transition"
                >
                    <div className="text-lg font-semibold mb-1">Валідатор JSON</div>
                    <p className="text-sm text-neutral-600">
                        Форми для заповнення та валідації блоків, експорт у ZIP.
                    </p>
                </a>
            </div>
        </section>
    );
}
