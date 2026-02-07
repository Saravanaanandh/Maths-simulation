"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BirdDivisionSimulator } from "@/components/simulations/bird-division/BirdDivisionSimulator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BirdDivisionPage() {
    return (
        <div className="min-h-screen bg-blue-50 font-outfit">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb / Back */}
                <div className="mb-6">
                    <Link
                        href="/games"
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Games
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Simulator */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl font-black text-slate-800 mb-2">Bird Division 🐦</h1>
                            <p className="text-slate-600 text-lg">
                                Feed the hungry baby birds equally to learn division!
                            </p>
                        </div>

                        <BirdDivisionSimulator />
                    </div>

                    {/* Sidebar / Instructions */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">How it Works</h2>
                            <div className="space-y-4 text-slate-600">
                                <p>
                                    <strong className="text-amber-600">Total Worms</strong> ÷ <strong className="text-blue-600">Nests</strong> = <strong className="text-green-600">Worms per Bird</strong>
                                </p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Look at the number of <strong>worms</strong> in the pile.</li>
                                    <li>Look at the number of <strong>baby birds</strong>.</li>
                                    <li>Click on a <strong>Nest</strong> to give it a worm.</li>
                                    <li>Share them <strong>equally</strong> so every bird is happy!</li>
                                    <li>Count how many worms one bird got. That's your answer!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-amber-100 p-6 rounded-2xl border border-amber-200">
                            <h3 className="font-bold text-amber-800 mb-2">Why this works?</h3>
                            <p className="text-amber-900 text-sm leading-relaxed">
                                Division is called <strong>"Fair Sharing"</strong>. <br /><br />
                                <strong>12 ÷ 3</strong> means "taking 12 items and sharing them fairly into 3 groups". <br /><br />
                                If everyone gets the same amount, you've divided correctly!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
