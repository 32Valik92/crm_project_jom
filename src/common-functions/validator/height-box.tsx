export function HeightBox({label}: { label: string }) {
    return (
        <div
            className="rounded-md border border-slate-600 bg-slate-900 px-3 py-2 h-[42px] flex items-center text-xs text-slate-200">
            {label}
        </div>
    );
}