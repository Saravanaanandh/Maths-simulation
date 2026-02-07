import { Navbar } from "@/components/layout/Navbar";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Calculator, Shapes, Binary } from "lucide-react";

export default function SimulationsIndex() {
    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-black font-outfit text-slate-800 mb-4">Math Games</h1>
                <p className="text-slate-500 text-lg mb-12 max-w-2xl">
                    Play interactive games to practice your math skills!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                    <ModuleCard
                        title="Rabbit Number Line"
                        description="Hop along the number line to solve addition problems! Great for early learners."
                        href="/games/rabbit-addition"
                        icon={<span className="text-3xl">🐰</span>}
                        difficulty="Easy"
                        color="green"
                    />
                    <ModuleCard
                        title="Fish Subtraction"
                        description="Feed the big fish and learn subtraction! Visual interactive learning."
                        href="/games/fish-subtraction"
                        icon={<span className="text-3xl">🐟</span>}
                        difficulty="Easy"
                        color="orange"
                    />



                    <ModuleCard
                        title="Frog Multiplication"
                        description="Create groups of frogs on lily pads to master multiplication basics."
                        href="/games/frog-multiplication"
                        icon={<span className="text-3xl">🐸</span>}
                        difficulty="Medium"
                        color="blue"
                    />
                    <ModuleCard
                        title="Bird Division"
                        description="Feed the hungry birds to learn division! Share worms equally."
                        href="/games/bird-division"
                        icon={<span className="text-3xl">🐦</span>}
                        difficulty="Medium"
                        color="orange"
                    />
                    <ModuleCard
                        title="Shopping Trip"
                        description="Learn to pay and calculate change in this shopping adventure!"
                        href="/games/shopping-money"
                        icon={<span className="text-3xl">🛍️</span>}
                        difficulty="Medium"
                        color="purple"
                    />
                    <ModuleCard
                        title="Target Number Challenge"
                        description="Combine numbers and operators to reach the target score! Master arithmetic operations."
                        href="/games/target-number"
                        icon={<Calculator />}
                        difficulty="Medium"
                        color="blue"
                    />
                    {/* <ModuleCard
                        title="Fraction Visualizer"
                        description="See how fractions work with interactive pie charts and bars. (Coming Soon)"
                        href="#"
                        icon={<Shapes />}
                        difficulty="Easy"
                        color="green"
                    />

                    <ModuleCard
                        title="Binary Logic Lab"
                        description="Understand 0s and 1s with digital logic gates. (Coming Soon)"
                        href="#"
                        icon={<Binary />}
                        difficulty="Hard"
                        color="purple"
                    /> */}
                </div>
            </main>
        </div>
    );
}
