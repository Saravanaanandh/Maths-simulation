"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { FishTank } from "./FishTank";
import { SliderControl } from "./SliderControl";
import { EquationDisplay } from "./EquationDisplay";
import { useVoiceAssistant } from "./VoiceAssistant";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface FishSubtractionSimulatorProps {
    initialLevel?: number;
}

export default function FishSubtractionSimulator({ initialLevel = 1 }: FishSubtractionSimulatorProps) {
    const [level, setLevel] = useState(initialLevel);
    const [totalFish, setTotalFish] = useState(10);
    const [subtractAmount, setSubtractAmount] = useState(3);
    const [eatenCount, setEatenCount] = useState(0);
    const [isEating, setIsEating] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [isSolved, setIsSolved] = useState(false);
    const [message, setMessage] = useState("");

    const { speak, enabled: soundEnabled, setEnabled: setSoundEnabled } = useVoiceAssistant();
    const prevEatenRef = useRef(0);

    // Level Generator Logic
    useEffect(() => {
        generateLevel(level);
    }, [level]);

    const generateLevel = (lvl: number) => {
        // Basic scaling logic
        // Easy: Total 5-10, Subtract 1-5
        // Medium: Total 10-20 (simplified for now), Subtract 5-10

        let minTotal = 5;
        let maxTotal = 10;

        if (lvl > 30) { minTotal = 10; maxTotal = 20; }
        if (lvl > 70) { minTotal = 20; maxTotal = 50; } // Adjusted for screen space capability

        const newTotal = Math.floor(Math.random() * (maxTotal - minTotal + 1)) + minTotal;
        // Subtract amount must be less than total
        const maxSub = Math.min(newTotal - 1, lvl > 30 ? 15 : 5);
        const minSub = 1;

        const newSubtract = Math.floor(Math.random() * (maxSub - minSub + 1)) + minSub;

        setTotalFish(newTotal);
        setSubtractAmount(newSubtract);
        setEatenCount(0);
        setUserAnswer("");
        setIsSolved(false);
        setMessage("");
        speak(`Let's solve ${newTotal} minus ${newSubtract}`);
    };

    const handleSliderChange = (newVal: number) => {
        if (isSolved) return; // Lock if solved

        setEatenCount(newVal);

        // Check if value INCREASED (eating happens)
        if (newVal > prevEatenRef.current) {
            setIsEating(true);
            speak(newVal.toString()); // Count out loud

            // Stop eating animation after short delay
            setTimeout(() => setIsEating(false), 500);
        }

        prevEatenRef.current = newVal;
    };

    const checkAnswer = () => {
        const correct = totalFish - subtractAmount;
        const inputVal = parseInt(userAnswer);

        if (inputVal === correct) {
            // Check if they actually performed the subtraction using the slider?
            // Optional constraint: require slider to be at target?
            if (eatenCount !== subtractAmount) {
                setMessage(`Feed the big fish ${subtractAmount} fishes first!`);
                return;
            }

            setIsSolved(true);
            setMessage("Correct! 🎉");
            speak("Correct! Great job.");
            confetti();

            // Auto-next level after delay
            setTimeout(() => {
                setLevel(l => l + 1);
            }, 3000);
        } else {
            setMessage("Try again!");
            speak("Try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Top Controls */}
            <div className="flex justify-between items-center mb-6 px-4">
                <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold">
                    Level {level}
                </div>
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors"
                >
                    {soundEnabled ? <Volume2 className="text-blue-500" /> : <VolumeX className="text-slate-400" />}
                </button>
            </div>

            <EquationDisplay
                total={totalFish}
                subtract={subtractAmount}
                result={isSolved ? (totalFish - subtractAmount) : "?"}
            />

            {/* Main Fish Interaction Area */}
            <div className="mb-8 relative">
                <FishTank
                    totalFish={totalFish}
                    eatenCount={eatenCount}
                    isEating={isEating}
                    largeFishPosition={eatenCount}
                />

                {/* Helper arrow or label if needed */}
                {eatenCount < subtractAmount && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 animate-pulse text-white font-bold text-shadow">
                        Drag Slider!
                    </div>
                )}
            </div>

            <SliderControl
                max={subtractAmount}
                value={eatenCount}
                onChange={handleSliderChange}
                disabled={isSolved}
            />

            {/* Answer Input Area - Only show if slider maxed out (interaction complete) */}
            {eatenCount === subtractAmount && !isSolved && (
                <div className="mt-8 flex flex-col items-center animate-in slide-in-from-bottom fade-in duration-500">
                    <p className="text-lg font-bold text-slate-600 mb-2">How many fishes are left?</p>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            className="w-24 h-16 text-center text-3xl font-black rounded-xl border-4 border-blue-200 focus:border-blue-500 outline-none transition-colors"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                        />
                        <button
                            onClick={checkAnswer}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 rounded-xl shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all"
                        >
                            Check
                        </button>
                    </div>
                </div>
            )}

            {message && (
                <div className={cn("text-center font-bold mt-6 text-xl animate-bounce", isSolved ? "text-green-500" : "text-orange-500")}>
                    {message}
                </div>
            )}
        </div>
    );
}
