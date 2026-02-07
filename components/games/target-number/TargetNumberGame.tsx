"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

interface TargetNumberGameProps {
    onScoreUpdate: (score: number) => void;
    onReset: () => void;
}

export function TargetNumberGame({ onScoreUpdate, onReset }: TargetNumberGameProps) {
    const [target, setTarget] = useState(0);
    const [current, setCurrent] = useState(0);
    const [moves, setMoves] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const newTarget = Math.floor(Math.random() * 20) + 10; // 10-30
        setTarget(newTarget);
        setCurrent(0);
        setMoves(0);
        setMessage("");
    };

    const handleAdd = (val: number) => {
        const next = current + val;
        setCurrent(next);
        setMoves(m => m + 1);

        if (next === target) {
            setMessage("Target Reached! 🎉");
            onScoreUpdate(100 - (moves * 5)); // Score based on moves
        } else if (next > target) {
            setMessage("Overshot! Try again.");
        }
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-sm border text-center max-w-md mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Target: {target}</h2>
                <div className="text-5xl font-black text-blue-600 mb-4">{current}</div>
                <div className="text-sm text-slate-500">Moves: {moves}</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 5, -1, -2, -5].map(val => (
                    <Button
                        key={val}
                        onClick={() => handleAdd(val)}
                        disabled={!!message && message.includes("Reached")}
                        className={val > 0 ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-red-100 text-red-700 hover:bg-red-200"}
                    >
                        {val > 0 ? `+${val}` : val}
                    </Button>
                ))}
            </div>

            {message && (
                <div className={`mb-6 font-bold text-lg ${message.includes("Reached") ? "text-green-600" : "text-orange-500"}`}>
                    {message}
                </div>
            )}

            <Button onClick={() => { startNewGame(); onReset(); }} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" /> New Game
            </Button>
        </div>
    );
}
