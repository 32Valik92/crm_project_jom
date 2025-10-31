"use client";

import {useEffect, useRef} from "react";
import {type Control, useFieldArray, type UseFormRegister, UseFormSetValue, useWatch,} from "react-hook-form";
import ImageUploader from "@/components/validator_json/ImageUploader";

type Props = {
    page?: string;
    block?: string;
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
};

const KIND_OPTS = [
    {v: "title", label: "Title"},
    {v: "paragraph", label: "Paragraph"},
    {v: "image", label: "Image"},
    {v: "cta", label: "CTA"},
    {v: "unordered", label: "Unordered list"},
    {v: "ordered", label: "Ordered list"},
] as const;

export default function SlotsBookOfRaDeluxeAboutPrimaryForm({
                                                                control,
                                                                registerAction,
                                                                setValue,
                                                            }: Props) {
    const blocksFA = useFieldArray({control, name: "blocks" as any});
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        if (blocksFA.fields.length === 0)
            blocksFA.append({kind: "title", h: 2, text: ""});
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-5">
            <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)}/>

            {blocksFA.fields.map((f, idx) => (
                <BlockEditor
                    key={f.id}
                    control={control}
                    registerAction={registerAction}
                    setValue={setValue}
                    idx={idx}
                    onRemove={() => blocksFA.remove(idx)}
                />
            ))}

            <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)}/>
        </div>
    );
}

/* ---------------- Допоміжні ---------------- */
function getErr(errors: any, path: string): { message: string } {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), errors);
}

/* ---------------- Toolbar ---------------- */
function AddToolbar({onAdd}: { onAdd: (k: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {KIND_OPTS.map((o) => (
                <button
                    key={o.v}
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 hover:border-slate-500 transition"
                    onClick={() => onAdd(o.v)}
                >
                    Додати {o.label}
                </button>
            ))}
        </div>
    );
}

/* ---------------- Додавання блоків ---------------- */
function addByKind(append: (v: any) => void, kind: string) {
    if (kind === "title") append({kind, h: 2, text: ""});
    else if (kind === "paragraph") append({kind, lines: [""]});
    else if (kind === "image")
        append({
            kind,
            alt: "",
            desktop: {src: "", height: 420},
            mobile: {src: "", height: 320},
        });
    else if (kind === "cta") append({kind, label: "", href: ""});
    else if (kind === "unordered") append({kind, intro: "", items: [""]});
    else if (kind === "ordered") append({kind, intro: "", items: [""]});
}

/* ---------------- Editor ---------------- */
function BlockEditor({
                         control,
                         registerAction,
                         setValue,
                         idx,
                         onRemove,
                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    idx: number;
    onRemove: () => void;
}) {
    const kind = useWatch({control, name: `blocks.${idx}.kind`}) as string;
    const dHeight = useWatch({control, name: `blocks.${idx}.desktop.height`});
    const mHeight = useWatch({control, name: `blocks.${idx}.mobile.height`});
    const errors = (control as any)._formState?.errors ?? {};

    const PAGE_KEY = "img";
    const BLOCK_KEY = "rename";

    useEffect(() => {
        if (kind !== "image") return;
        if (typeof dHeight !== "number")
            setValue(`blocks.${idx}.desktop.height`, 420, {shouldDirty: true});
        if (typeof mHeight !== "number")
            setValue(`blocks.${idx}.mobile.height`, 320, {shouldDirty: true});
    }, [kind, dHeight, mHeight, idx, setValue]);

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 space-y-4 shadow-md">
            <div className="grid md:grid-cols-2 gap-3">
                <select
                    className={[
                        "rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                        getErr(errors, `blocks.${idx}.kind`) ? "border-red-600" : "",
                    ].join(" ")}
                    {...registerAction(`blocks.${idx}.kind`)}
                >
                    {KIND_OPTS.map((o) => (
                        <option key={o.v} value={o.v}>
                            {o.label}
                        </option>
                    ))}
                </select>

                {kind === "title" && (
                    <div className="flex flex-col">
                        <select
                            className={[
                                "rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                                getErr(errors, `blocks.${idx}.h`) ? "border-red-600" : "",
                            ].join(" ")}
                            {...registerAction(`blocks.${idx}.h`, {
                                setValueAs: (v) => Number(v),
                            })}
                        >
                            <option value={2}>h2</option>
                            <option value={3}>h3</option>
                        </select>
                        {getErr(errors, `blocks.${idx}.h`) && (
                            <span className="text-xs text-red-500">Вибери рівень заголовка</span>
                        )}
                    </div>
                )}
            </div>

            {kind === "title" && (
                <FieldInput
                    registerAction={registerAction}
                    errors={errors}
                    name={`blocks.${idx}.text`}
                    placeholder="text"
                />
            )}

            {kind === "cta" && (
                <div className="grid md:grid-cols-2 gap-3">
                    <FieldInput
                        registerAction={registerAction}
                        errors={errors}
                        name={`blocks.${idx}.label`}
                        placeholder="label"
                    />
                    <FieldInput
                        registerAction={registerAction}
                        errors={errors}
                        name={`blocks.${idx}.href`}
                        placeholder="href"
                    />
                </div>
            )}

            {kind === "paragraph" && (
                <LinesEditor
                    control={control}
                    registerAction={registerAction}
                    base={`blocks.${idx}.lines`}
                    errors={errors}
                />
            )}

            {kind === "image" && (
                <div className="space-y-3">
                    <FieldInput
                        registerAction={registerAction}
                        errors={errors}
                        name={`blocks.${idx}.alt`}
                        placeholder="alt"
                    />

                    {["desktop", "mobile"].map((v) => (
                        <div key={v} className="grid md:grid-cols-2 gap-3 items-start">
                            <ImageUploader
                                page={PAGE_KEY}
                                block={BLOCK_KEY}
                                fieldPath={`blocks.${idx}.${v}.src`}
                                variant={v}
                                label={`${v}.src`}
                                setValue={setValue}
                                basePath="slots/bookofradeluxe"
                            />

                            <div
                                className="rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-xs text-slate-200">
                                {v}.height: {v === "desktop" ? 420 : 320}
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {(kind === "unordered" || kind === "ordered") && (
                <div className="space-y-3">
                    <FieldInput
                        registerAction={registerAction}
                        errors={errors}
                        name={`blocks.${idx}.intro`}
                        placeholder="intro"
                    />
                    <LinesEditor
                        control={control}
                        registerAction={registerAction}
                        base={`blocks.${idx}.items`}
                        errors={errors}
                    />
                </div>
            )}

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-100 hover:bg-red-700 hover:border-red-700 transition"
                onClick={onRemove}
            >
                Видалити блок
            </button>
        </div>
    );
}

/* ---------------- FieldInput ---------------- */
function FieldInput({
                        registerAction,
                        errors,
                        name,
                        placeholder,
                        type = "text",
                    }: {
    registerAction: UseFormRegister<any>;
    errors: any;
    name: string;
    placeholder?: string;
    type?: string;
}) {
    const hasErr = Boolean(getErr(errors, name));
    return (
        <div className="flex flex-col gap-1">
            <input
                className={[
                    "w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                    hasErr ? "border-red-600" : "",
                ].join(" ")}
                placeholder={placeholder}
                type={type}
                {...registerAction(name)}
            />
            {hasErr && (
                <span className="text-xs text-red-500">
          {String(getErr(errors, name)?.message ?? "Обов’язкове поле")}
        </span>
            )}
        </div>
    );
}

/* ---------------- LinesEditor ---------------- */
function LinesEditor({
                         control,
                         registerAction,
                         base,
                         errors,
                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    base: string;
    errors: any;
}) {
    const fa = useFieldArray({control, name: base as any});
    useEffect(() => {
        if (fa.fields.length === 0) fa.append("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const baseErr = getErr(errors, base);
    return (
        <div className="space-y-2">
            {fa.fields.map((it, iIdx) => {
                const path = `${base}.${iIdx}`;
                const hasErr = Boolean(getErr(errors, path));
                return (
                    <div key={it.id} className="flex items-center gap-2">
                        <input
                            className={[
                                "w-full rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 transition",
                                hasErr ? "border-red-600" : "",
                            ].join(" ")}
                            {...registerAction(path)}
                        />
                        <button
                            type="button"
                            className="rounded-md bg-slate-700 px-2 py-1 text-xs text-slate-100 hover:bg-red-700 transition"
                            onClick={() => fa.remove(iIdx)}
                        >
                            ×
                        </button>
                    </div>
                );
            })}

            {baseErr && Array.isArray(baseErr) && baseErr.message && (
                <span className="text-xs text-red-500">{String(baseErr.message)}</span>
            )}

            <button
                type="button"
                className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-100 hover:bg-slate-700 transition"
                onClick={() => fa.append("")}
            >
                Додати рядок
            </button>
        </div>
    );
}
