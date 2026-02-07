interface EquationDisplayProps {
    total: number;
    subtract: number;
    result?: number | string; // Can be ? or user input
}

export function EquationDisplay({ total, subtract, result = "?" }: EquationDisplayProps) {
    return (
        <div className="flex items-center justify-center gap-4 text-6xl font-black font-outfit text-slate-700 bg-white p-6 rounded-3xl shadow-sm border-2 border-slate-100 mb-8 max-w-xl mx-auto">
            <div className="text-blue-600">{total}</div>
            <div className="text-slate-400">-</div>
            <div className="text-red-500">{subtract}</div>
            <div className="text-slate-400">=</div>
            <div className="text-indigo-600 min-w-[60px] text-center border-b-4 border-indigo-200">
                {result}
            </div>
        </div>
    );
}
