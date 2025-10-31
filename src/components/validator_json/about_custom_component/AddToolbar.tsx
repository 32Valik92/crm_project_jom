import {KIND_OPTS_ABOUT_CUSTOM_BLOCK} from "@/constants";

export function AddToolbar({onAdd}: { onAdd: (kind: string) => void }) {
	return (
		<div className="flex flex-wrap gap-2">
			{KIND_OPTS_ABOUT_CUSTOM_BLOCK.map((option) => (
				<button
					key={option.value}
					type="button"
					className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700 hover:border-slate-500 transition"
					onClick={() => onAdd(option.value)}
				>
					Додати {option.label}
				</button>
			))}
		</div>
	);
}
