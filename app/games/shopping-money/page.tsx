"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ShoppingSimulator } from "@/components/simulations/shopping-money/ShoppingSimulator";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ShoppingMoneyPage() {
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
                            <h1 className="text-3xl font-black text-slate-800 mb-2 flex items-center gap-2">
                                Shopping Trip 🛍️
                            </h1>
                            <p className="text-slate-600 text-lg">
                                Buy items, pay correctly, and check your change!
                            </p>
                        </div>

                        <ShoppingSimulator />
                    </div>

                    {/* Sidebar / Instructions */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">How to Play</h2>
                            <div className="space-y-4 text-slate-600">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                                    <p>Look at the <strong>Price Tag</strong> on the item.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                                    <p><strong>Pay</strong> the shopkeeper by clicking on the money bills.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                                    <p><strong>Calculate Change</strong>: If you gave too much, how much should you get back?</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-100 p-6 rounded-2xl border border-indigo-200">
                            <h3 className="font-bold text-indigo-900 mb-2">Scenario</h3>
                            <p className="text-indigo-800 text-sm leading-relaxed mb-4">
                                You are going to the shop to buy a toy or a treat. You check the price, give the shopkeeper your money, and make sure they give you the right change back!
                            </p>
                            <div className="bg-white/50 p-3 rounded-lg text-xs font-mono text-indigo-900">
                                Change = Money Given - Price
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
