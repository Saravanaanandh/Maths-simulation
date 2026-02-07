"use client";

import { TargetNumberGame } from "@/components/games/target-number/TargetNumberGame";
import { SimulationLayout } from "@/components/layout/SimulationLayout";
import { useState, useEffect } from "react";

export default function TargetNumberPage() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("target-number-highscore");
        if (saved) {
            setHighScore(parseInt(saved));
        }
    }, []);

    const handleScoreUpdate = (newScore: number) => {
        setScore(newScore);
        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("target-number-highscore", newScore.toString());
        }
    };

    const handleReset = () => {
        // Logic to reset the game component if needed, or primarily reset the score here
        // In a real app we might pass a reset trigger or key to the game component
        window.location.reload(); // Simple reset for now
    };

    return (
        <SimulationLayout
            title="Target Number Challenge"
            score={score}
            highScore={highScore}
            onReset={handleReset}
            instructions="Combine the numbers and operators to equal the target number shown at the top. Use valid mathematical expressions."
        >
            <TargetNumberGame onScoreUpdate={handleScoreUpdate} onReset={handleReset} />
        </SimulationLayout>
    );
}
