import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
    title: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
    difficulty?: "Easy" | "Medium" | "Hard";
    color?: "blue" | "green" | "purple" | "orange";
}

const colorMap = {
    blue: "bg-blue-100 text-blue-600 border-blue-300 hover:border-blue-500",
    green: "bg-green-100 text-green-600 border-green-300 hover:border-green-500",
    purple: "bg-purple-100 text-purple-600 border-purple-300 hover:border-purple-500",
    orange: "bg-orange-100 text-orange-600 border-orange-300 hover:border-orange-500",
};

export function ModuleCard({ title, description, href, icon, difficulty = "Easy", color = "blue" }: ModuleCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "block p-6 rounded-3xl border-4 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group bg-white",
                colorMap[color].split(" ")[2] // Border color
            )}
        >
            <div className={cn("absolute top-0 right-0 p-4 rounded-bl-3xl opacity-20 transition-opacity group-hover:opacity-40", colorMap[color].split(" ")[0])}>
                {icon}
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-sm", colorMap[color].split(" ")[0], colorMap[color].split(" ")[1])}>
                    {icon}
                </div>

                <h3 className="text-2xl font-bold font-outfit text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-slate-500 font-medium mb-6 flex-grow">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-400 bg-slate-100 py-1 px-3 rounded-full">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{difficulty}</span>
                    </div>

                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110",
                        color === 'blue' ? 'bg-blue-500' :
                            color === 'green' ? 'bg-green-500' :
                                color === 'purple' ? 'bg-purple-500' : 'bg-orange-500'
                    )}>
                        <ArrowRight className="w-5 h-5 font-bold" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
