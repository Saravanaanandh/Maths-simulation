"use client";

import FishSubtractionSimulator from "@/components/simulations/fish-subtraction/FishSubtractionSimulator";
import { SimulationLayout } from "@/components/layout/SimulationLayout";
import { useState } from "react";

export default function FishSubtractionPage() {
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        setResetKey(prev => prev + 1);
    };

    return (
        <SimulationLayout
            title="Fish Subtraction"
            onReset={handleReset}
            instructions="Use the slider to help the big fish eat the small fishes! Then count how many are left to solve the puzzle."
        >
            <FishSubtractionSimulator key={resetKey} />
        </SimulationLayout>
    );
}
