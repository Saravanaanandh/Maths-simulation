"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCcw, Rabbit, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceAssistant } from "./VoiceAssistant";
import confetti from "canvas-confetti";

type GamePhase = 'idle' | 'auto_jumping' | 'manual_jumping' | 'input' | 'solved';

export function RabbitAdditionSimulator() {
    // Game state
    const [level, setLevel] = useState(1);
    const [equation, setEquation] = useState({ a: 2, b: 3 });
    const [rabbitPosition, setRabbitPosition] = useState(0);
    const [gamePhase, setGamePhase] = useState<GamePhase>('idle');
    const [userAnswer, setUserAnswer] = useState("");

    // Voice Assistant
    const { speak, enabled: soundEnabled, setEnabled: setSoundEnabled } = useVoiceAssistant();
    const hasSpokenIntroRef = useRef(false);

    // Initialize Level
    useEffect(() => {
        generateLevel(level);
    }, [level]);

    const generateLevel = (currentLevel: number) => {
        let minTotal, maxTotal;

        if (currentLevel <= 10) {
            // Easy: Sums up to 10
            minTotal = 3;
            maxTotal = 10;
        } else if (currentLevel <= 20) {
            // Medium: Sums up to 15
            minTotal = 11;
            maxTotal = 15;
        } else {
            // Hard: Sums up to 20
            minTotal = 16;
            maxTotal = 20;
        }

        const total = Math.floor(Math.random() * (maxTotal - minTotal + 1)) + minTotal;
        const a = Math.floor(Math.random() * (total - 1)) + 1; // Ensure neither is 0 if possible
        const b = total - a;

        setEquation({ a, b });
        setRabbitPosition(0);
        setGamePhase('idle');
        setUserAnswer("");

        // Announce only if user initiated (skipping strict strict mode double firing)
        if (hasSpokenIntroRef.current) {
            // small delay to allow state update
            setTimeout(() => speak(`Level ${currentLevel}. Let's solve ${a} plus ${b}`), 500);
        } else {
            hasSpokenIntroRef.current = true;
        }
    };

    // Auto Jump Sequence (0 -> A)
    const startAutoJump = async () => {
        if (gamePhase !== 'idle') return;
        setGamePhase('auto_jumping');

        // Loop from 1 to A
        for (let i = 1; i <= equation.a; i++) {
            setRabbitPosition(i);

            // Wait for jump animation (approx 500ms duration)
            await new Promise(resolve => setTimeout(resolve, 500));

            // Speak and wait for it to finish
            await speak(i.toString());

            // Small pause between numbers
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        // End of auto jump
        setGamePhase('manual_jumping');
        speak("Now add more!");
    };

    // Manual Jump (+1)
    const handleManualJump = () => {
        if (gamePhase !== 'manual_jumping') return;

        const nextPos = rabbitPosition + 1;
        const total = equation.a + equation.b;

        setRabbitPosition(nextPos);
        speak(nextPos.toString());

        if (nextPos === total) {
            setGamePhase('input');
            setTimeout(() => speak("How many in total?"), 500);
        }
    };

    // Check Input Answer
    const checkAnswer = () => {
        const total = equation.a + equation.b;
        if (parseInt(userAnswer) === total) {
            setGamePhase('solved');
            speak("Correct! Well done.");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Next level after delay
            setTimeout(() => {
                if (level < 30) {
                    setLevel(l => l + 1);
                } else {
                    speak("All levels completed! You are a master!");
                }
            }, 3000);
        } else {
            speak("Try again.");
        }
    };

    // Reset current level
    const handleReset = () => {
        setRabbitPosition(0);
        setGamePhase('idle');
        setUserAnswer("");
        speak(`Let's try again. ${equation.a} plus ${equation.b}`);
    };

    return (
        <div className="w-full md:w-[80%] max-w-none mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-amber-100">
            {/* Header / Level & Equation */}
            <div className="bg-amber-50 p-4 border-b-4 border-amber-100 relative flex items-center justify-center">

                {/* Level Badge */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-amber-200 text-amber-800 px-4 py-2 rounded-full font-bold">
                    Level {level}
                </div>

                {/* Voice Control */}
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors"
                >
                    {soundEnabled ? <Volume2 className="text-amber-500 w-5 h-5" /> : <VolumeX className="text-slate-400 w-5 h-5" />}
                </button>

                {/* Equation */}
                <div className="inline-flex items-center justify-center gap-2 md:gap-4 text-3xl md:text-5xl font-black text-amber-600 bg-white px-6 md:px-12 py-2 md:py-3 rounded-2xl shadow-sm">
                    <span>{equation.a}</span>
                    <span>+</span>
                    <span>{equation.b}</span>
                    <span>=</span>
                    {gamePhase === 'input' || gamePhase === 'solved' ? (
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                            className={`w-24 text-center border-b-4 outline-none ${gamePhase === 'solved' ? "text-green-500 border-green-500" : "text-amber-600 border-amber-300"
                                }`}
                            autoFocus
                        />
                    ) : (
                        <span className="text-slate-300">?</span>
                    )}
                </div>
            </div>

            {/* Simulation Area */}
            <div className="relative h-72 bg-gradient-to-b from-amber-50/50 to-blue-50 overflow-x-auto overflow-y-hidden flex flex-col justify-end pb-12 scrollbar-thin scrollbar-thumb-amber-200">

                {/* Number Line - Zoomed out on mobile */}
                <div className="relative mx-4 md:mx-16 h-2 bg-slate-400 rounded-full z-0 min-w-[150%] md:min-w-0 transform md:transform-none origin-left">
                    {/* Tick Marks - Dynamic based on max total range? Fixed to 20 for now to support Hard levels? */}
                    {/* The previous version was fixed to 10. We need to scale this if sums go to 20. */}
                    {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className="absolute flex flex-col items-center" style={{ left: `${(i / 20) * 100}%`, transform: 'translateX(-50%)' }}>
                            <div className="h-3 w-1 bg-slate-400 rounded-full mb-1"></div>
                            {/* Show numbers every 1 or 5 steps to avoid crowding? Showing all for now, maybe small font */}
                            <span className="text-xs sm:text-sm font-bold text-slate-600 font-mono">{i}</span>
                        </div>
                    ))}

                    {/* Rabbit */}
                    <motion.div
                        className="absolute bottom-6 z-10 text-pink-500"
                        style={{ left: `${(rabbitPosition / 20) * 100}%`, x: '-50%' }}
                        animate={{
                            left: `${(rabbitPosition / 20) * 100}%`,
                            y: (gamePhase === 'auto_jumping' || gamePhase === 'manual_jumping') ? [0, -40, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white p-1 rounded-full shadow-lg border-2 border-pink-200 transform scale-75 md:scale-100 origin-bottom">
                            <Rabbit size={36} fill="currentColor" />
                        </div>
                    </motion.div>

                    {/* Jumps History */}
                    <svg className="absolute bottom-6 left-0 w-full h-20 pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
                        {Array.from({ length: rabbitPosition }).map((_, i) => {
                            const start = i;
                            const end = i + 1;
                            const isFirstPart = end <= equation.a;
                            const color = isFirstPart ? "#f59e0b" : "#ec4899"; // Amber for A, Pink for B

                            return (
                                <path
                                    key={i}
                                    d={`M${(start / 20) * 100}%,20 Q${((start + 0.5) / 20) * 100}%,-10 ${(end / 20) * 100}%,20`}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="2"
                                    strokeDasharray="4 2"
                                    className="opacity-60"
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 border-t border-slate-100 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={handleReset}
                    className="text-slate-400 hover:text-slate-600 w-full md:w-auto"
                >
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>

                <div className="flex gap-4 w-full md:w-auto justify-center">
                    {/* Start Button */}
                    {gamePhase === 'idle' && (
                        <Button onClick={startAutoJump} size="xl" className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl shadow-lg border-b-4 border-amber-700 active:border-b-0 active:translate-y-1">
                            Start <Rabbit className="ml-2 animate-bounce" />
                        </Button>
                    )}

                    {/* Manual Jump Button */}
                    {(gamePhase === 'manual_jumping' || gamePhase === 'auto_jumping') && (
                        <Button
                            onClick={handleManualJump}
                            disabled={gamePhase === 'auto_jumping'}
                            size="xl"
                            className={`
                                rounded-2xl shadow-lg border-b-4 active:border-b-0 active:translate-y-1
                                ${gamePhase === 'auto_jumping'
                                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                                    : "bg-pink-500 hover:bg-pink-600 text-white border-pink-700"
                                }
                            `}
                        >
                            {gamePhase === 'auto_jumping' ? "Rabbit Jumping..." : "Jump +1"}
                        </Button>
                    )}

                    {/* Check Answer Button */}
                    {gamePhase === 'input' && (
                        <Button onClick={checkAnswer} size="xl" className="bg-green-500 hover:bg-green-600 text-white rounded-2xl shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1">
                            Check Answer
                        </Button>
                    )}

                    {gamePhase === 'solved' && (
                        <div className="text-2xl font-bold text-green-500 animate-bounce">
                            Great Job!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
