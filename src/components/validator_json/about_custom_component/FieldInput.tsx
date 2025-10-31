import type {UseFormRegister} from "react-hook-form";
import {getErr} from "@/components/validator_json/about_custom_component/getErr";

export function FieldInput({
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