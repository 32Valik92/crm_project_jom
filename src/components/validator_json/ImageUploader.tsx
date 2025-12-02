"use client";

import {useId, useMemo, useState} from "react";
import {UseFormSetValue} from "react-hook-form";
import {useImageStore} from "./imageStore";

async function hashFile(file: File): Promise<string> {
    const buf = await file.arrayBuffer();
    const digest = await crypto.subtle.digest("SHA-1", buf);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 8);
}

const slug = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const normalizeFolderPath = (p?: string) => p ? p.replace(/^\/+|\/+$/g, "") : "";

type Props = {
    page: string;
    block: string;
    fieldPath: string;
    variant?: string;
    label?: string;
    setValue: UseFormSetValue<any>;
    basePath?: string;
};

export default function ImageUploader({
                                          page, block, fieldPath, variant, label, setValue, basePath
                                      }: Props) {
    const store = useImageStore();
    const [preview, setPreview] = useState<string | null>(null);
    const [filenameUI, setFilenameUI] = useState<string>("");
    const id = useId();

    const nameBase = useMemo(() => {
        const tail = slug(fieldPath.replace(/\.(src|image|file)$/, "").replace(/\./g, "-"));
        return `${slug(page)}__${slug(block)}__${tail}${variant ? `__${slug(variant)}` : ""}`;
    }, [page, block, fieldPath, variant]);

    const folder = useMemo(() => normalizeFolderPath(basePath), [basePath]);

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-xs text-slate-300 mb-1">
                    {label}
                </label>
            )}

            <div
                className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 h-[42px] flex items-center justify-between">
                <div className="text-sm text-slate-200 truncate pr-3">
                    {filenameUI || "Виберіть файл • Файл не вибрано"}
                </div>

                <div className="shrink-0">
                    <label
                        htmlFor={id}
                        className="cursor-pointer rounded-md border border-slate-500 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 transition"
                    >
                        Обрати
                    </label>
                </div>
            </div>

            <input
                id={id}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setFilenameUI(file.name);

                    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
                    const h = await hashFile(file);
                    const filenameOnly = `${nameBase}__${h}.${ext}`;
                    const pathInsideImages = folder ? `${folder}/${filenameOnly}` : filenameOnly;

                    const jsonPath = `/images/${pathInsideImages}`;
                    setValue(fieldPath, jsonPath, {shouldDirty: true});

                    store.register(pathInsideImages, file);

                    const url = URL.createObjectURL(file);
                    setPreview(url);
                }}
            />

            {preview && (
                <div className="mt-2">
                    <img
                        src={preview}
                        alt="preview"
                        className="h-20 w-auto rounded-md border border-slate-700"
                    />
                </div>
            )}
        </div>
    );
}
