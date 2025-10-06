"use client";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
    PAGES,
    BLOCK_META,
    BLOCK_SCHEMAS,
    type PageKey,
    type BlockKey,
    type AnyBlockValue,
} from "@/lib/schemas";
import { indexForAbout, indexForApp, rootIndex } from "@/lib/generators";

export default function Home() {
    const [localeFolder, setLocaleFolder] = useState("cs");
    const [page, setPage] = useState<PageKey | "">("");
    const [block, setBlock] = useState<BlockKey | "">("");
    const [data, setData] = useState<Partial<Record<BlockKey, AnyBlockValue>>>({});

    const schema = block ? (BLOCK_SCHEMAS as any)[block] : null;
    const form = useForm<any>({ resolver: schema ? zodResolver(schema) : undefined });

    function openBlock() {
        if (!block) return;
        const draft = (data as any)[block];
        form.reset(draft ?? {});
        (document.getElementById("formDialog") as HTMLDialogElement)?.showModal();
    }

    function saveBlock(values: any) {
        if (!block) return;
        setData((prev) => ({ ...prev, [block as BlockKey]: values }));
        (document.getElementById("formDialog") as HTMLDialogElement)?.close();
    }

    async function generateZip() {
        if (!localeFolder) return;
        const zip = new JSZip();

        if (data.about_primary) {
            const about = zip.folder(`${localeFolder}/about`)!;
            about.file("about_primary.json", JSON.stringify(data.about_primary, null, 2));
            about.file("index.ts", indexForAbout());
        }

        const hasApp = data.app_about_primary || data.mobile_app;
        if (hasApp) {
            const app = zip.folder(`${localeFolder}/app`)!;
            if (data.app_about_primary)
                app.file("about_primary.json", JSON.stringify(data.app_about_primary, null, 2));
            if (data.mobile_app)
                app.file("mobile_app.json", JSON.stringify(data.mobile_app, null, 2));
            app.file("index.ts", indexForApp());
        }

        zip.file(`${localeFolder}/index.ts`, rootIndex(!!data.about_primary, !!hasApp));

        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${localeFolder}.zip`);
    }

    const availableBlocks: BlockKey[] = page ? PAGES[page].blocks : [];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">JSON CRM Generator (MVP)</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-2">
                    <span className="text-sm">Назва кореневої папки (locale)</span>
                    <input
                        className="rounded border p-2"
                        value={localeFolder}
                        onChange={(e) => setLocaleFolder(e.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm">Сторінка</span>
                    <select
                        className="rounded border p-2"
                        value={page}
                        onChange={(e) => {
                            const p = e.target.value as PageKey | "";
                            setPage(p);
                            setBlock("");
                        }}
                    >
                        <option value="">—</option>
                        {Object.entries(PAGES).map(([key, v]) => (
                            <option key={key} value={key}>
                                {v.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm">Блок</span>
                    <select
                        className="rounded border p-2"
                        value={block}
                        onChange={(e) => setBlock(e.target.value as BlockKey | "")}
                        disabled={!page}
                    >
                        <option value="">—</option>
                        {availableBlocks.map((b) => (
                            <option key={b} value={b}>
                                {BLOCK_META[b].label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex gap-3">
                <button
                    className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                    onClick={openBlock}
                    disabled={!block}
                >
                    Відкрити форму блоку
                </button>
                <button className="rounded border px-4 py-2" onClick={generateZip}>
                    Згенерувати ZIP
                </button>
            </div>

            <section className="rounded border bg-white p-4">
                <h2 className="mb-3 font-semibold">Поточні дані</h2>
                <ul className="space-y-1 text-sm">
                    {(["about_primary", "app_about_primary", "mobile_app"] as BlockKey[]).map((b) => (
                        <li key={b}>
                            <span className="font-medium">{BLOCK_META[b].label}:</span>{" "}
                            {data[b] ? "заповнено ✅" : "порожньо"}
                        </li>
                    ))}
                </ul>
            </section>

            <dialog id="formDialog" className="rounded-xl p-0">
                <FormDialogContent
                    block={block as BlockKey | ""}
                    form={form}
                    onCancel={() => (document.getElementById("formDialog") as HTMLDialogElement)?.close()}
                    onSave={saveBlock}
                />
            </dialog>
        </div>
    );
}

/* ---------------- ФОРМИ ---------------- */
function FormDialogContent({ block, form, onCancel, onSave }: any) {
    if (!block) return null;
    const { register, handleSubmit, control, formState: { errors } } = form;

    const Row = ({ label, name, as = "input" }: { label: string; name: string; as?: "input" | "textarea" }) => (
        <label className="flex flex-col gap-1">
            <span className="text-xs text-neutral-600">{label}</span>
            {as === "input" ? (
                <input className="rounded border p-2" {...register(name)} />
            ) : (
                <textarea className="rounded border p-2" rows={4} {...register(name)} />
            )}
            {errors?.[name]?.message && (
                <span className="text-xs text-red-600">{String((errors as any)[name].message)}</span>
            )}
        </label>
    );

    return (
        <form onSubmit={handleSubmit(onSave)} className="w-[90vw] max-w-3xl space-y-4 p-6">
            <h3 className="text-lg font-semibold">{block}</h3>

            {block === "about_primary" && (
                <div className="space-y-3">
                    <Row label="Заголовок" name="title" />
                    <Row label="Герой-картинка (path)" name="imageHero" />
                    <Row label="Інтро" name="intro" as="textarea" />
                    <div className="grid gap-3 rounded border p-3">
                        <span className="text-sm font-medium">miniGame</span>
                        <Row label="miniGame.title" name="miniGame.title" />
                        <Row label="miniGame.text" name="miniGame.text" as="textarea" />
                        <Row label="miniGame.note" name="miniGame.note" as="textarea" />
                    </div>
                </div>
            )}

            {block === "app_about_primary" && (
                <div className="space-y-3">
                    <Row label="image1" name="image1" />
                    <Row label="pIntro" name="pIntro" as="textarea" />
                    <Row label="uiTitle" name="uiTitle" />
                    <Row label="pUI" name="pUI" as="textarea" />
                    <Row label="image2" name="image2" />
                    <Row label="pHome" name="pHome" as="textarea" />
                    <Row label="gamesTitle" name="gamesTitle" />
                    <Row label="pGames" name="pGames" as="textarea" />
                </div>
            )}

            {block === "mobile_app" && (
                <MobileAppFields control={control} register={register} />
            )}

            <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="rounded border px-4 py-2" onClick={onCancel}>Скасувати</button>
                <button type="submit" className="rounded bg-black px-4 py-2 text-white">Зберегти блок</button>
            </div>
        </form>
    );
}

function MobileAppFields({ control, register }: any) {
    const { fields: cardFields, append: addCard, remove: delCard } = useFieldArray({ control, name: "cards" });
    const { fields: rowFields, append: addRow, remove: delRow } = useFieldArray({ control, name: "compare.rows" });

    return (
        <div className="space-y-4">
            <div className="grid gap-2 rounded border p-3">
                <span className="text-sm font-medium">title</span>
                <input className="rounded border p-2" {...register("title.brand")} placeholder="brand" />
                <input className="rounded border p-2" {...register("title.tail")} placeholder="tail" />
            </div>

            <label className="flex flex-col gap-1">
                <span className="text-xs text-neutral-600">lead</span>
                <textarea className="rounded border p-2" rows={3} {...register("lead")} />
            </label>

            {/* Cards */}
            <div className="rounded border p-3 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">cards</span>
                    <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => addCard({ title: "", steps: [""] })}>
                        + Додати картку
                    </button>
                </div>
                {cardFields.map((cf, i) => (
                    <div key={cf.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">Картка #{i + 1}</span>
                            <button type="button" className="text-xs underline" onClick={() => delCard(i)}>Видалити</button>
                        </div>
                        <input className="rounded border p-2 w-full mb-2" {...register(`cards.${i}.title`)} placeholder="title" />
                        <StepsArray control={control} register={register} namePrefix={`cards.${i}.steps`} addLabel="+ Додати крок" />
                    </div>
                ))}
            </div>

            {/* Compare */}
            <div className="rounded border p-3 space-y-3">
                <label className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-600">compare.title</span>
                    <input className="rounded border p-2" {...register("compare.title")} />
                </label>

                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">compare.rows</span>
                    <button type="button" className="rounded border px-2 py-1 text-sm" onClick={() => addRow({ label: "", items: [""] })}>
                        + Додати рядок
                    </button>
                </div>

                {rowFields.map((rf, i) => (
                    <div key={rf.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">Рядок #{i + 1}</span>
                            <button type="button" className="text-xs underline" onClick={() => delRow(i)}>Видалити</button>
                        </div>
                        <input className="rounded border p-2 w-full mb-2" {...register(`compare.rows.${i}.label`)} placeholder="label" />
                        <StepsArray control={control} register={register} namePrefix={`compare.rows.${i}.items`} addLabel="+ Додати пункт" />
                    </div>
                ))}
            </div>

            <label className="flex flex-col gap-1">
                <span className="text-xs text-neutral-600">cta</span>
                <input className="rounded border p-2" {...register("cta")} />
            </label>
        </div>
    );
}

function StepsArray({ control, register, namePrefix, addLabel }: any) {
    const { fields, append, remove } = useFieldArray({ control, name: namePrefix });
    return (
        <div className="bg-neutral-50 rounded-md p-2 space-y-2">
            {fields.map((f, idx) => (
                <div key={f.id} className="flex items-center gap-2">
                    <input className="w-full rounded border p-2" {...register(`${namePrefix}.${idx}`)} />
                    <button type="button" className="text-xs underline" onClick={() => remove(idx)}>×</button>
                </div>
            ))}
            <button type="button" className="rounded border px-2 py-1 text-xs" onClick={() => append("")}>
                {addLabel}
            </button>
        </div>
    );
}
