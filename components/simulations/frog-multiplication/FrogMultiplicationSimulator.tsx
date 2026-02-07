"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus, RefreshCcw, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceAssistant } from "./VoiceAssistant";
import confetti from "canvas-confetti";

export function FrogMultiplicationSimulator() {
    // Game state
    const [level, setLevel] = useState(1);
    const [equation, setEquation] = useState({ a: 2, b: 3 });
    const [leaves, setLeaves] = useState(0);
    const [frogsPerLeaf, setFrogsPerLeaf] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [gameState, setGameState] = useState<'playing' | 'solved' | 'completed'>('playing');

    // Voice
    const { speak, enabled: soundEnabled, setEnabled: setSoundEnabled } = useVoiceAssistant();
    const hasSpokenIntroRef = useRef(false);

    // Initial setup & Level Generation
    useEffect(() => {
        generateLevel(level);
    }, [level]);

    const generateLevel = (currentLevel: number) => {
        let minFactor, maxFactor;

        if (currentLevel <= 10) {
            // Easy: 1-5
            minFactor = 1;
            maxFactor = 5;
        } else if (currentLevel <= 20) {
            // Medium: 3-7
            minFactor = 3;
            maxFactor = 7;
        } else {
            // Hard: 6-9
            minFactor = 6;
            maxFactor = 9;
        }

        const a = Math.floor(Math.random() * (maxFactor - minFactor + 1)) + minFactor;
        const b = Math.floor(Math.random() * (maxFactor - minFactor + 1)) + minFactor;

        setEquation({ a, b });
        setLeaves(0);
        setFrogsPerLeaf(0);
        setUserAnswer("");
        setGameState('playing');

        // Speak level info
        setTimeout(() => {
            speak(`Level ${currentLevel}. Solve ${a} times ${b}`);
        }, 800);
    };

    // Check Answer
    const checkAnswer = () => {
        if (gameState !== 'playing') return;

        const total = equation.a * equation.b;
        const inputVal = parseInt(userAnswer);

        if (inputVal === total) {
            setGameState('solved');
            speak("Correct! Great job!");
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });

            setTimeout(() => {
                if (level < 30) {
                    setLevel(l => l + 1);
                } else {
                    setGameState('completed');
                    speak("All levels completed! You are a multiplication master!");
                }
            }, 3000);

        } else {
            speak("Not quite. Try counting the frogs again.");
        }
    };

    // Handlers
    const handleAddLeaf = () => {
        if (leaves < 12) {
            const newCount = leaves + 1;
            setLeaves(newCount);
            if (newCount <= equation.a) speak(`${newCount} leaf`);
        }
    };

    const handleRemoveLeaf = () => {
        if (leaves > 0) {
            setLeaves(prev => prev - 1);
        }
    };

    const handleAddFrog = () => {
        if (leaves === 0) {
            speak("Add some leaves first!");
            return;
        }
        if (frogsPerLeaf < 10) {
            const newCount = frogsPerLeaf + 1;
            setFrogsPerLeaf(newCount);
            if (newCount <= equation.b) speak(`${newCount} frogs per leaf`);
        }
    };

    const handleRemoveFrog = () => {
        if (frogsPerLeaf > 0) {
            setFrogsPerLeaf(prev => prev - 1);
        }
    };

    const handleReset = () => {
        generateLevel(level);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto border-4 border-blue-200">
            {/* Header */}
            <div className="bg-blue-50 p-6 flex flex-col md:flex-row items-center justify-between border-b-4 border-blue-100 relative">

                {/* Level Badge */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-blue-200 text-blue-800 px-4 py-2 rounded-full font-bold hidden md:block">
                    Level {level}
                </div>

                {/* Voice Toggle */}
                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-colors z-10"
                >
                    {soundEnabled ? <Volume2 className="text-blue-500 w-5 h-5" /> : <VolumeX className="text-slate-400 w-5 h-5" />}
                </button>

                <div className="flex flex-col items-center w-full">
                    <div className="text-sm font-bold text-blue-400 mb-2 tracking-wider uppercase md:hidden">Level {level}</div>
                    <div className="inline-flex items-center gap-2 md:gap-4 text-3xl md:text-6xl font-black text-slate-700 bg-white px-4 md:px-8 py-2 md:py-4 rounded-3xl shadow-sm border-2 border-slate-50">
                        <div className="flex flex-col items-center">
                            <span className={leaves === equation.a ? "text-green-600" : "text-slate-400"}>{equation.a}</span>
                            <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide hidden sm:block">Leaves</span>
                        </div>
                        <span className="text-slate-300">×</span>
                        <div className="flex flex-col items-center">
                            <span className={frogsPerLeaf === equation.b ? "text-orange-500" : "text-slate-400"}>{equation.b}</span>
                            <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wide hidden sm:block">Frogs</span>
                        </div>
                        <span className="text-slate-300">=</span>

                        {/* Input Field */}
                        {gameState === 'solved' || gameState === 'completed' ? (
                            <span className="text-green-600 scale-110 transition-transform">
                                {equation.a * equation.b}
                            </span>
                        ) : (
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                className="w-24 text-center bg-slate-50 border-b-4 border-blue-300 focus:border-blue-500 outline-none rounded-t-lg text-blue-600 placeholder-blue-200"
                                placeholder="?"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Pond Visual */}
            <div className="relative min-h-[400px] bg-blue-400 p-4 md:p-8 flex flex-wrap content-center justify-center gap-4 md:gap-8 overflow-hidden transition-colors duration-1000">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>

                <AnimatePresence>
                    {Array.from({ length: leaves }).map((_, leafIndex) => (
                        <motion.div
                            key={`leaf-${leafIndex}`}
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="relative w-16 h-16 sm:w-32 sm:h-32 md:w-40 md:h-40"
                        >
                            {/* Lily Pad */}
                            <div className="absolute inset-0 bg-green-500 rounded-full border-b-8 border-green-700 shadow-xl"
                                style={{
                                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 55% 100%, 50% 50%, 45% 100%, 0% 100%)",
                                    transform: `rotate(${leafIndex * 15}deg)`
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-green-400 rounded-full opacity-30 scale-75 blur-md"></div>

                            {/* Frogs on this Leaf */}
                            <div className="absolute inset-0 flex flex-wrap items-center justify-center p-4 content-center">
                                <AnimatePresence>
                                    {Array.from({ length: frogsPerLeaf }).map((_, frogIndex) => (
                                        <motion.div
                                            key={`frog-${leafIndex}-${frogIndex}`}
                                            initial={{ scale: 0, y: -20 }}
                                            animate={{ scale: 1, y: 0 }}
                                            exit={{ scale: 0 }}
                                            className="m-0.5 md:m-1"
                                        >
                                            <span className="text-2xl md:text-3xl filter drop-shadow-md">🐸</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {leaves === 0 && (
                    <div className="text-white/50 text-2xl font-bold flex items-center justify-center w-full h-full absolute inset-0 pointer-events-none">
                        Start by adding leaves!
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="bg-white p-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">

                {/* Leaf Controls */}
                <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-2xl border-2 border-green-100">
                    <span className="text-green-800 font-bold uppercase tracking-wider text-xs">Step 1: Leaves</span>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRemoveLeaf}
                            disabled={leaves === 0 || gameState !== 'playing'}
                            className="w-10 h-10 rounded-full border-2 border-green-200 text-green-700 hover:bg-green-100"
                        >
                            <Minus size={20} />
                        </Button>
                        <span className="text-3xl font-black text-green-700 w-8 text-center">{leaves}</span>
                        <Button
                            size="icon"
                            onClick={handleAddLeaf}
                            disabled={leaves >= 12 || gameState !== 'playing'}
                            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md border-b-2 border-green-700 active:border-b-0 active:translate-y-0.5"
                        >
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                {/* Frog Controls */}
                <div className="flex flex-col items-center gap-2 p-3 bg-orange-50 rounded-2xl border-2 border-orange-100">
                    <span className="text-orange-800 font-bold uppercase tracking-wider text-xs">Step 2: Frogs</span>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleRemoveFrog}
                            disabled={frogsPerLeaf === 0 || gameState !== 'playing'}
                            className="w-10 h-10 rounded-full border-2 border-orange-200 text-orange-700 hover:bg-orange-100"
                        >
                            <Minus size={20} />
                        </Button>
                        <span className="text-3xl font-black text-orange-700 w-8 text-center">{frogsPerLeaf}</span>
                        <Button
                            size="icon"
                            onClick={handleAddFrog}
                            disabled={frogsPerLeaf >= 10 || gameState !== 'playing'}
                            className="w-10 h-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md border-b-2 border-orange-700 active:border-b-0 active:translate-y-0.5"
                        >
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                {/* Check Answer Action */}
                <div className="md:col-span-2 lg:col-span-1 flex flex-col justify-center gap-2">
                    <Button
                        size="xl"
                        onClick={checkAnswer}
                        disabled={userAnswer === "" || gameState !== 'playing'}
                        className="w-full h-16 text-xl rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
                    >
                        {gameState === 'solved' ? "Correct! 🎉" : "Check Answer"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <RefreshCcw size={14} className="mr-1" /> Reset Level
                    </Button>
                </div>
            </div>
        </div>
    );
}
