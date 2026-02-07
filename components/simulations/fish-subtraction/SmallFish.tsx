import { cn } from "@/lib/utils";

interface SmallFishProps {
    color?: string;
    className?: string;
}

export function SmallFish({ color = "text-orange-400", className }: SmallFishProps) {
    return (
        <svg
            viewBox="0 0 100 60"
            className={cn("w-full h-full drop-shadow-md", color, className)}
            fill="currentColor"
        >
            {/* Tail */}
            <path d="M95 30 L80 15 L80 45 Z" />
            {/* Body */}
            <ellipse cx="45" cy="30" rx="40" ry="25" />
            {/* Eye */}
            <circle cx="25" cy="20" r="3" fill="white" />
            <circle cx="25" cy="20" r="1" fill="black" />
            {/* Fin */}
            <path d="M40 30 Q50 15 60 30" fill="none" stroke="black" strokeWidth="2" strokeOpacity="0.1" />
            {/* Mouth */}
            <path d="M10 30 Q15 30 15 35" fill="none" stroke="black" strokeWidth="2" strokeOpacity="0.2" />
        </svg>
    );
}
