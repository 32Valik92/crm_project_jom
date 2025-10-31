import {Control, UseFormRegister, UseFormSetValue, useWatch} from "react-hook-form";
import {useEffect} from "react";
import {getErr} from "@/components/validator_json/about_custom_component/getErr";
import {KIND_OPTS_ABOUT_CUSTOM_BLOCK} from "@/constants";
import {FieldInput} from "@/components/validator_json/about_custom_component/FieldInput";
import {LinesEditor} from "@/components/validator_json/about_custom_component/LinesEditor";
import ImageUploader from "@/components/validator_json/ImageUploader";
import {HeightBox} from "@/common-functions/validator/height-box";

export function BlockEditor({
	                            control,
	                            registerAction,
	                            setValue,
	                            idx,
	                            onRemove,
	                            basePath
                            }: {
	control: Control;
	registerAction: UseFormRegister<any>;
	setValue: UseFormSetValue<any>;
	idx: number;
	onRemove: () => void;
	basePath: string;
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
					{KIND_OPTS_ABOUT_CUSTOM_BLOCK.map((o) => (
						<option key={o.value} value={o.value}>
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
								basePath={basePath}
							/>

							<HeightBox label={`${v}.height: ${v === "desktop" ? 420 : 320}`}/>
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