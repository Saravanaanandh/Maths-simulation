import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Volume2, VolumeX, CheckCircle, ArrowLeft, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { useVoiceAssistant } from "./VoiceAssistant";
import { BirdNest } from "./BirdNest";
import { WormCollection } from "./WormCollection";

interface LevelData {
    dividend: number;
    divisor: number;
}

const MAX_LEVEL = 30;

const GENERATE_LEVEL = (level: number): LevelData => {
    let divisor = 2;
    let dividend = 2;

    if (level <= 5) {
        // Levels 1-5: Divisor 2. Dividends 2-10 (Simple pairs).
        divisor = 2;
        dividend = divisor * (Math.floor(Math.random() * 5) + 1); // 1 to 5
    } else if (level <= 10) {
        // Levels 6-10: Divisor 3. Dividends 3-15.
        divisor = 3;
        dividend = divisor * (Math.floor(Math.random() * 5) + 1);
    } else if (level <= 15) {
        // Levels 11-15: Divisor 4. Dividends 4-20.
        divisor = 4;
        dividend = divisor * (Math.floor(Math.random() * 5) + 1);
    } else if (level <= 20) {
        // Levels 16-20: Mixed Divisors 2-5. Dividends up to 25.
        divisor = Math.floor(Math.random() * 4) + 2; // 2 to 5
        dividend = divisor * (Math.floor(Math.random() * 5) + 1);
    } else if (level <= 25) {
        // Levels 21-25: Divisors 6-8. Dividends up to 40.
        divisor = Math.floor(Math.random() * 3) + 6; // 6 to 8
        dividend = divisor * (Math.floor(Math.random() * 5) + 1);
    } else {
        // Levels 26-30: Divisors 9-10. Dividends up to 50.
        divisor = Math.floor(Math.random() * 2) + 9; // 9 to 10
        dividend = divisor * (Math.floor(Math.random() * 5) + 1);
    }

    // Ensure we don't get 0 (logic above prevents it, but good to be safe)
    if (dividend === 0) dividend = divisor;

    return { dividend, divisor };
};

export function BirdDivisionSimulator() {
    const { speak, enabled: voiceEnabled, setEnabled: setVoiceEnabled } = useVoiceAssistant();

    // Game State
    const [currentLevel, setCurrentLevel] = useState(1);
    const [levelData, setLevelData] = useState<LevelData>({ dividend: 2, divisor: 2 });
    const [wormsInPile, setWormsInPile] = useState(2);
    const [nests, setNests] = useState<number[]>([]);

    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    // Initialize Level
    useEffect(() => {
        startNewLevel(currentLevel);
    }, [currentLevel]);

    const startNewLevel = (level: number) => {
        const newData = GENERATE_LEVEL(level);
        setLevelData(newData);
        setWormsInPile(newData.dividend);
        setNests(new Array(newData.divisor).fill(0));
        setUserAnswer("");
        setFeedback(null);
        setIsCorrect(false);

        speak(`Level ${level}. Divide ${newData.dividend} worms between ${newData.divisor} birds.`);
    };

    const handleDistributeWorm = (nestIndex: number) => {
        if (wormsInPile > 0) {
            setWormsInPile(prev => prev - 1);
            setNests(prev => {
                const newNests = [...prev];
                newNests[nestIndex]++;
                return newNests;
            });
            speak((nests[nestIndex] + 1).toString());
        } else {
            speak("No more worms in the pile!");
        }
    };

    const handleCheckAnswer = () => {
        const numAnswer = parseInt(userAnswer);
        const correctAnswer = levelData.dividend / levelData.divisor;

        if (isNaN(numAnswer)) {
            setFeedback({ type: 'error', message: "Please enter a number!" });
            speak("Please enter a number.");
            return;
        }

        // Check if distributed correctly (optional but encouraged)
        // const isDistributionCorrect = nests.every(count => count === correctAnswer) && wormsInPile === 0;

        if (numAnswer === correctAnswer) {
            setIsCorrect(true);
            setFeedback({ type: 'success', message: "Correct! Great job!" });
            speak("Correct! You are a division master!");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F59E0B', '#10B981', '#3B82F6']
            });
        } else {
            setFeedback({ type: 'error', message: "Not quite. Try distributing the worms evenly!" });
            speak("Not quite. Try distributing the worms evenly to see the answer.");
        }
    };

    const handleNextLevel = () => {
        if (currentLevel < MAX_LEVEL) {
            setCurrentLevel(prev => prev + 1);
        }
    };

    const handlePrevLevel = () => {
        if (currentLevel > 1) {
            setCurrentLevel(prev => prev - 1);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-amber-100">
            {/* Header / Controls */}
            <div className="bg-amber-50 p-4 border-b border-amber-100 flex flex-wrap items-center justify-between gap-4">

                {/* Level Control */}
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-amber-200 shadow-sm">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevLevel}
                        disabled={currentLevel === 1}
                        className="text-amber-600 hover:bg-amber-50"
                    >
                        <ArrowLeft size={20} />
                    </Button>

                    <div className="flex flex-col items-center px-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Level</span>
                        <span className="text-xl font-black text-amber-800 leading-none">{currentLevel} <span className="text-amber-300 text-base">/ {MAX_LEVEL}</span></span>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNextLevel}
                        disabled={currentLevel === MAX_LEVEL}
                        className="text-amber-600 hover:bg-amber-50"
                    >
                        <ArrowRight size={20} />
                    </Button>
                </div>

                {/* Progress Bar (Visual) */}
                <div className="hidden md:flex flex-1 mx-4 h-3 bg-amber-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${(currentLevel / MAX_LEVEL) * 100}%` }}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
                        className="text-amber-700 border-amber-200 hover:bg-amber-100"
                    >
                        {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </Button>
                    <Button
                        onClick={() => startNewLevel(currentLevel)}
                        variant="ghost"
                        className="text-amber-700 hover:bg-amber-100"
                        title="Restart Level"
                    >
                        <RefreshCw className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Main Simulation Area */}
            <div className="p-8 space-y-12">

                {/* Equation Display */}
                <div className="flex flex-col items-center justify-center animate-in slide-in-from-top duration-500">
                    <div className="bg-white px-6 md:px-12 py-3 md:py-6 rounded-2xl shadow-sm border-2 border-slate-100 flex items-center gap-3 md:gap-6 text-3xl md:text-7xl font-black text-slate-800">
                        <span className="text-amber-600">{levelData.dividend}</span>
                        <span className="text-slate-300">÷</span>
                        <span className="text-blue-600">{levelData.divisor}</span>
                        <span className="text-slate-300">=</span>
                        <div className="relative">
                            <input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                className="w-16 h-16 md:w-24 md:h-24 text-center bg-slate-50 border-4 border-slate-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors"
                                placeholder="?"
                                disabled={isCorrect}
                            />
                            {isCorrect && (
                                <div className="absolute -top-6 -right-6 text-green-500 animate-bounce">
                                    <CheckCircle size={40} className="fill-white" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Interactive Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Source: Worm Pile */}
                    <div className="lg:col-span-1">
                        <WormCollection
                            count={wormsInPile}
                        />
                        <p className="text-center text-slate-500 mt-4 text-sm">
                            Need to share <strong>{wormsInPile}</strong> more worms
                        </p>
                    </div>

                    {/* Arrow / Action */}
                    <div className="hidden lg:flex flex-col items-center justify-center pt-16 opacity-50">
                        <ArrowRight size={48} className="text-slate-300 animate-pulse" />
                        <span className="text-slate-400 font-medium mt-2">Click nests to feed</span>
                    </div>

                    {/* Destination: Nests */}
                    <div className="lg:col-span-1 flex flex-col items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-6">
                            {nests.map((count, idx) => (
                                <BirdNest
                                    key={idx}
                                    id={idx}
                                    wormCount={count}
                                    onReceiveWorm={() => handleDistributeWorm(idx)}
                                    highlighted={wormsInPile > 0}
                                />
                            ))}
                        </div>
                        <p className="text-center text-slate-500 text-sm">
                            <strong>{nests.length}</strong> hungry birds waiting
                        </p>
                    </div>

                </div>

                {/* Feedback & Actions */}
                <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
                    {feedback && (
                        <div className={`
                            px-6 py-3 rounded-xl font-bold text-center w-full animate-in fade-in slide-in-from-bottom-2
                            ${feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}
                        `}>
                            {feedback.message}
                        </div>
                    )}

                    {!isCorrect ? (
                        <Button
                            onClick={handleCheckAnswer}
                            size="lg"
                            className="w-full text-xl py-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-orange-200 transition-all transform hover:scale-[1.02]"
                        >
                            Check Answer
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNextLevel}
                            size="lg"
                            className="w-full text-xl py-8 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-200 transition-all transform hover:scale-[1.02] animate-bounce-slow"
                        >
                            Next Level <ArrowRight className="ml-2" />
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
}
