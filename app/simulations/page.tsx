import { Navbar } from "@/components/layout/Navbar";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { Circle, Square, Triangle, Box, Cylinder, Globe, Plus, Minus, X, Divide } from "lucide-react";

export default function SimulationsIndex() {
    return (
        <div className="min-h-screen bg-indigo-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12">
                    <h1 className="text-4xl font-black font-outfit text-slate-800 mb-4">Math Concepts</h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        Interactive lessons to visualize and understand mathematical concepts.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* Arithmetic Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <span className="p-2 bg-blue-100 rounded-lg text-blue-600"><Plus className="w-5 h-5" /></span>
                            Arithmetic Operations
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ModuleCard
                                title="Addition"
                                description="Visual addition with objects."
                                href="/simulations/addition"
                                icon={<Plus />}
                                difficulty="Easy"
                                color="blue"
                            />
                            <ModuleCard
                                title="Subtraction"
                                description="Visual subtraction concepts."
                                href="/simulations/subtraction"
                                icon={<Minus />}
                                difficulty="Easy"
                                color="orange"
                            />
                            <ModuleCard
                                title="Multiplication"
                                description="Understanding groups and arrays."
                                href="/simulations/multiplication"
                                icon={<X />}
                                difficulty="Medium"
                                color="purple"
                            />
                            <ModuleCard
                                title="Division"
                                description="Sharing and grouping."
                                href="/simulations/division"
                                icon={<Divide />}
                                difficulty="Medium"
                                color="green"
                            />
                        </div>
                    </section>

                    {/* 2D Geometry Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <span className="p-2 bg-purple-100 rounded-lg text-purple-600"><Square className="w-5 h-5" /></span>
                            2D Shapes
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ModuleCard
                                title="Square"
                                description="Properties of squares."
                                href="/simulations/square"
                                icon={<Square />}
                                difficulty="Easy"
                                color="purple"
                            />
                            <ModuleCard
                                title="Rectangle"
                                description="Properties of rectangles."
                                href="/simulations/rectangle"
                                icon={<Square className="scale-x-125" />}
                                difficulty="Easy"
                                color="blue"
                            />
                            <ModuleCard
                                title="Circle"
                                description="Understanding circles."
                                href="/simulations/circle"
                                icon={<Circle />}
                                difficulty="Medium"
                                color="orange"
                            />
                            <ModuleCard
                                title="Triangle"
                                description="Types of triangles."
                                href="/simulations/triangle"
                                icon={<Triangle />}
                                difficulty="Medium"
                                color="green"
                            />
                        </div>
                    </section>

                    {/* 3D Geometry Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <span className="p-2 bg-green-100 rounded-lg text-green-600"><Box className="w-5 h-5" /></span>
                            3D Geometry
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ModuleCard
                                title="Cube"
                                description="Explore cubes in 3D."
                                href="/simulations/cube"
                                icon={<Box />}
                                difficulty="Medium"
                                color="green"
                            />
                            <ModuleCard
                                title="Cuboid"
                                description="Explore rectangular prisms."
                                href="/simulations/cuboid"
                                icon={<Box className="scale-x-125" />}
                                difficulty="Medium"
                                color="blue"
                            />
                            <ModuleCard
                                title="Cone"
                                description="Volume and surface area."
                                href="/simulations/cone"
                                icon={<Triangle className="rotate-180" />}
                                difficulty="Hard"
                                color="orange"
                            />
                            <ModuleCard
                                title="Sphere"
                                description="Properties of spheres."
                                href="/simulations/sphere"
                                icon={<Globe />}
                                difficulty="Hard"
                                color="purple"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
