"use client";

import { RabbitAdditionSimulator } from "@/components/simulations/rabbit-addition/RabbitAdditionSimulator";
import { SimulationLayout } from "@/components/layout/SimulationLayout";
import { useState } from "react";

export default function RabbitAdditionPage() {
    const [resetKey, setResetKey] = useState(0);

    const handleReset = () => {
        setResetKey(prev => prev + 1);
    };

    return (
        <SimulationLayout
            title="Rabbit Number Line Addition"
            onReset={handleReset}
            instructions="Help the rabbit hop along the number line to solve the addition problem! Watch how numbers add up step by step."
        >
            <RabbitAdditionSimulator key={resetKey} />
        </SimulationLayout>
    );
}
