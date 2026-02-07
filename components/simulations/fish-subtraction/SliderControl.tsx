import { cn } from "@/lib/utils";

interface SliderControlProps {
    max: number;
    value: number;
    onChange: (val: number) => void;
    disabled?: boolean;
}

export function SliderControl({ max, value, onChange, disabled }: SliderControlProps) {
    const percent = max > 0 ? (value / max) * 100 : 0;

    return (
        <div className="w-full max-w-2xl mx-auto py-8 bg-white rounded-3xl shadow-lg border-2 border-slate-100 px-8">
            <div className="flex justify-between mb-4 text-slate-500 font-bold uppercase tracking-wider text-sm">
                <span>Start</span>
                <span>Eat {max} Fishes</span>
            </div>

            <input
                type="range"
                min={0}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                disabled={disabled}
                className={cn(
                    "w-full h-4 rounded-lg appearance-none cursor-pointer border border-slate-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{
                    background: `linear-gradient(to right, #3b82f6 ${percent}%, #e2e8f0 ${percent}%)`
                }}
            />

            {/* Numeric Labels */}
            <div className="flex justify-between mt-2 px-1">
                {Array.from({ length: max + 1 }).map((_, i) => (
                    <div key={i} className={cn("flex flex-col items-center w-4 text-center",
                        // Show all on desktop (md), but only even or specific ones on mobile if crowded? 
                        // Simple check: Always show 0 and max. Others hide on mobile if too many?
                        // For now just allow flex space.
                        "flex"
                    )}>
                        <span className={cn("text-xs font-bold transition-colors", i <= value ? "text-blue-600" : "text-slate-300")}>|</span>
                        <span className={cn("text-xs font-semibold mt-1",
                            i <= value ? "text-blue-600" : "text-slate-400",
                            // Hide numbers on very small screens if crowded
                            max > 10 && i % 2 !== 0 && i !== max ? "hidden md:block" : "block"
                        )}>
                            {i}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <span className="text-4xl font-black text-blue-600 font-mono bg-blue-50 px-6 py-2 rounded-xl border-2 border-blue-100">
                    {value}
                </span>
                <p className="text-slate-400 text-sm font-bold mt-2">Fishes Eaten</p>
            </div>
        </div>
    );
}
