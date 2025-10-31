import {Control, useFieldArray, UseFormRegister} from "react-hook-form";
import {useEffect} from "react";
import {getErr} from "@/components/validator_json/about_custom_component/getErr";

export function LinesEditor({
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
