"use client";

import { useEffect, useRef } from "react";
import {type Control, type UseFormRegister, useFieldArray, useWatch, UseFormSetValue} from "react-hook-form";

type Props = {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
};

const KIND_OPTS = [
    { v: "title", label: "Title" },
    { v: "paragraph", label: "Paragraph" },
    { v: "image", label: "Image" },
    { v: "cta", label: "CTA" },
    { v: "unordered", label: "Unordered list" },
    { v: "ordered", label: "Ordered list" },
] as const;

export default function BonusFreebetAboutPrimaryForm({ control, registerAction, setValue }: Props) {
    const blocksFA = useFieldArray({ control, name: "blocks" as any });
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        if (blocksFA.fields.length === 0)
            blocksFA.append({ kind: "title", h: 2, text: "" });
        didInit.current = true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-[12px]">
            <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)} />
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
            <AddToolbar onAdd={(k) => addByKind(blocksFA.append, k)} />
        </div>
    );
}

// ——— допоміжні для помилок (як було в тебе) ———
function getErr(errors: any, path: string):{message: string} {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), errors);
}

function AddToolbar({ onAdd }: { onAdd: (k: string) => void }) {
    return (
        <div className="flex flex-wrap gap-[8px]">
            {KIND_OPTS.map(o => (
                <button
                    key={o.v}
                    type="button"
                    className="rounded-[4px] border px-[10px] py-[6px] text-[12px] leading-[16px]"
                    onClick={() => onAdd(o.v)}
                >
                    Додати {o.label}
                </button>
            ))}
        </div>
    );
}

function addByKind(append: (v: any) => void, kind: string) {
    if (kind === "title") append({ kind, h: 2, text: "" });
    else if (kind === "paragraph") append({ kind, lines: [""] });
    else if (kind === "image")
        append({
            kind,
            alt: "",
            desktop: { src: "", height: 420 },
            mobile:  { src: "", height: 320 },
        });
    else if (kind === "cta") append({ kind, label: "", href: "" });
    else if (kind === "unordered") append({ kind, intro: "", items: [""] });
    else if (kind === "ordered") append({ kind, intro: "", items: [""] });
}


function BlockEditor({
                         control, registerAction, setValue, idx, onRemove,
                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    idx: number;
    onRemove: () => void;
}) {
    const kind = useWatch({ control, name: `blocks.${idx}.kind` }) as string;
    const dHeight = useWatch({ control, name: `blocks.${idx}.desktop.height` });
    const mHeight = useWatch({ control, name: `blocks.${idx}.mobile.height` });
    const errors = (control as any)._formState?.errors ?? {};

    useEffect(() => {
        if (kind !== "image") return;
        if (typeof dHeight !== "number") setValue(`blocks.${idx}.desktop.height`, 420, { shouldDirty: true });
        if (typeof mHeight !== "number") setValue(`blocks.${idx}.mobile.height`, 320, { shouldDirty: true });
    }, [kind, dHeight, mHeight, idx, setValue]);

    return (
        <div className="rounded-[6px] border p-[12px] space-y-[10px]">
            <div className="grid md:grid-cols-2 gap-[8px]">
                <select
                    className={[
                        "rounded-[4px] border p-[8px]",
                        getErr(errors, `blocks.${idx}.kind`) ? "border-[#dc2626]" : ""
                    ].join(" ")}
                    {...registerAction(`blocks.${idx}.kind`)}
                >
                    {KIND_OPTS.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>

                {kind === "title" && (
                    <div className="flex flex-col">
                        <select
                            className={[
                                "rounded-[4px] border p-[8px]",
                                getErr(errors, `blocks.${idx}.h`) ? "border-[#dc2626]" : ""
                            ].join(" ")}
                            {...registerAction(`blocks.${idx}.h`, { setValueAs: (v) => Number(v) })}
                        >
                            <option value={2}>h2</option>
                            <option value={3}>h3</option>
                        </select>
                        {getErr(errors, `blocks.${idx}.h`) && (
                            <span className="text-[12px] leading-[16px] text-[#dc2626]">Вибери рівень заголовка</span>
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

            {kind === "paragraph" && (
                <LinesEditor
                    control={control}
                    registerAction={registerAction}
                    base={`blocks.${idx}.lines`}
                    errors={errors}
                />
            )}

            {kind === "image" && (
                <div className="space-y-[8px]">
                    <FieldInput
                        registerAction={registerAction}
                        errors={errors}
                        name={`blocks.${idx}.alt`}
                        placeholder="alt"
                    />
                    {["desktop","mobile"].map(v => (
                        <div key={v} className="grid md:grid-cols-2 gap-[8px]">
                            <FieldInput
                                registerAction={registerAction}
                                errors={errors}
                                name={`blocks.${idx}.${v}.src`}
                                placeholder={`${v}.src`}
                            />
                            <div className="rounded-[4px] border p-[8px] text-[12px] leading-[16px] bg-neutral-50">
                                {v}.height: {v === "desktop" ? 420 : 320}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {(kind === "unordered" || kind === "ordered") && (
                <div className="space-y-[8px]">
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

            <button type="button" className="rounded-[4px] border px-[10px] py-[6px] text-[12px] leading-[16px]" onClick={onRemove}>
                Видалити блок
            </button>
        </div>
    );
}

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
        <div className="flex flex-col gap-[4px]">
            <input
                className={["rounded-[4px] border p-[8px] w-full", hasErr ? "border-[#dc2626]" : ""].join(" ")}
                placeholder={placeholder}
                type={type}
                {...registerAction(name)}
            />
            {hasErr && (
                <span className="text-[12px] leading-[16px] text-[#dc2626]">
          {String(getErr(errors, name)?.message ?? "Обов’язкове поле")}
        </span>
            )}
        </div>
    );
}


function LinesEditor({
                         control, registerAction, base, errors,
                     }: {
    control: Control;
    registerAction: UseFormRegister<any>;
    base: string;
    errors: any;
}) {
    const fa = useFieldArray({ control, name: base as any });
    useEffect(() => { if (fa.fields.length === 0) fa.append(""); /* eslint-disable-next-line */ }, []);
    const baseErr = getErr(errors, base);
    return (
        <div className="space-y-[8px]">
            {fa.fields.map((it, iIdx) => {
                const path = `${base}.${iIdx}`;
                const hasErr = Boolean(getErr(errors, path));
                return (
                    <div key={it.id} className="flex items-center gap-[8px]">
                        <input
                            className={["w-full rounded-[4px] border p-[8px]", hasErr ? "border-[#dc2626]" : ""].join(" ")}
                            {...registerAction(path)}
                        />
                        <button type="button" className="text-[12px] leading-[16px] underline" onClick={() => fa.remove(iIdx)}>×</button>
                    </div>
                );
            })}
            {baseErr && Array.isArray(baseErr) && baseErr.message && (
                <span className="text-[12px] leading-[16px] text-[#dc2626]">{String(baseErr.message)}</span>
            )}
            <button type="button" className="rounded-[4px] border px-[8px] py-[4px] text-[12px] leading-[16px]" onClick={() => fa.append("")}>
                Додати рядок
            </button>
        </div>
    );
}