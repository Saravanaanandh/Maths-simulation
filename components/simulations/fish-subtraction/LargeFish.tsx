import { cn } from "@/lib/utils";

interface LargeFishProps {
    className?: string;
    isEating?: boolean;
}

export function LargeFish({ className, isEating = false }: LargeFishProps) {
    return (
        <svg
            viewBox="0 0 200 120"
            className={cn("w-full h-full drop-shadow-xl transition-transform duration-300", className)}
        >
            <g className="text-blue-500 fill-current">
                {/* Tail */}
                <path d="M180 60 L200 20 L200 100 Z" className="text-blue-600" />

                {/* Upper Body/Head - Rotates up when eating */}
                <path
                    d="M100 60 Q50 60 20 40 Q50 0 120 10 Q160 20 180 60 Z"
                    className={cn("origin-[180px_60px] transition-transform duration-200 ease-in-out", isEating ? "-rotate-12" : "rotate-0")}
                />

                {/* Lower Body/Jaw - Rotates down when eating */}
                <path
                    d="M100 60 Q50 60 20 80 Q50 120 120 110 Q160 100 180 60 Z"
                    className={cn("origin-[180px_60px] transition-transform duration-200 ease-in-out", isEating ? "rotate-12" : "rotate-0")}
                />

                {/* Eye */}
                <g className={cn("transition-transform duration-200", isEating ? "-translate-y-2" : "")}>
                    <circle cx="60" cy="40" r="8" fill="white" />
                    <circle cx="60" cy="40" r="3" fill="black" />
                </g>

                {/* Side Fin */}
                <path d="M110 60 Q130 40 140 70" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="4" />
            </g>
        </svg>
    );
}
