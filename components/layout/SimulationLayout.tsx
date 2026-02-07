"use client";

import { ArrowLeft, Volume2, VolumeX, RotateCcw, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SimulationLayoutProps {
    children: React.ReactNode;
    title: string;
    score?: number;
    highScore?: number;
    onReset?: () => void;
    instructions?: string;
}

export function SimulationLayout({
    children,
    title,
    score,
    highScore,
    onReset,
    instructions
}: SimulationLayoutProps) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Simulation Header */}
            <header className="bg-white border-b-4 border-indigo-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/games" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-2xl font-bold font-outfit text-indigo-900">{title}</h1>
                </div>

                <div className="flex items-center gap-6">
                    {(score !== undefined) && (
                        <div className="flex gap-4">
                            <div className="bg-indigo-50 px-4 py-2 rounded-xl flex flex-col items-center border-2 border-indigo-100">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Score</span>
                                <span className="text-xl font-black text-indigo-600 font-mono">{score}</span>
                            </div>
                            {(highScore !== undefined) && (
                                <div className="bg-yellow-50 px-4 py-2 rounded-xl flex flex-col items-center border-2 border-yellow-100 hidden sm:flex">
                                    <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Best</span>
                                    <span className="text-xl font-black text-yellow-600 font-mono">{highScore}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className={cn("p-2 rounded-xl transition-colors", showInstructions ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200")}
                            title="Instructions"
                        >
                            <Info className="w-6 h-6" />
                        </button>

                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                            title="Toggle Sound"
                        >
                            {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                        </button>

                        {onReset && (
                            <button
                                onClick={onReset}
                                className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 border-2 border-transparent hover:border-red-200 transition-all active:scale-95"
                                title="Reset Simulation"
                            >
                                <RotateCcw className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow p-4 md:p-8 relative overflow-hidden">
                <div className="max-w-6xl mx-auto h-full grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Main Game/Simulation Area */}
                    <div className="lg:col-span-3 bg-white rounded-3xl border-4 border-slate-100 shadow-sm p-6 relative min-h-[500px] flex items-center justify-center">
                        {children}
                    </div>

                    {/* Sidebar / Info Panel */}
                    <div className="lg:col-span-1 space-y-4">
                        {showInstructions && (
                            <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg animate-in slide-in-from-right fade-in duration-300">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-indigo-200" /> How to Play
                                </h3>
                                <p className="text-indigo-100 leading-relaxed text-sm">
                                    {instructions || "Interact with the simulation area to explore the mathematical concepts."}
                                </p>
                            </div>
                        )}

                        <div className="bg-white p-4 rounded-3xl border-2 border-slate-100">
                            <h3 className="font-bold text-slate-400 text-sm uppercase tracking-wider mb-4 text-center">Tools</h3>
                            {/* Placeholder for tool buttons (calculator, notes, etc.) */}
                            <div className="grid grid-cols-2 gap-2">
                                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors text-xs font-bold text-center">
                                    Calc
                                </button>
                                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors text-xs font-bold text-center">
                                    Notes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
