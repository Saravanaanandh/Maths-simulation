"use client";

import Link from "next/link";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Games", href: "/games" },
        { name: "Lessons", href: "/simulations" },
        { name: "About", href: "/#about" },
    ];

    return (
        <nav className="bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="bg-yellow-400 p-2 rounded-xl border-2 border-yellow-500 group-hover:rotate-12 transition-transform">
                                <Gamepad2 className="w-8 h-8 text-white" />
                            </div>
                            <span className="font-outfit font-bold text-2xl text-blue-600 tracking-tight">
                                Math<span className="text-yellow-500">Playground</span>
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-slate-600 hover:text-blue-500 font-bold text-lg font-outfit transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 transition-all group-hover:w-full rounded-full"></span>
                            </Link>
                        ))}
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all">
                            For Teachers
                        </button>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-blue-500 p-2"
                        >
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={cn("md:hidden border-b-2 border-blue-100 overflow-hidden transition-all duration-300", isOpen ? "max-h-96 py-4" : "max-h-0")}>
                <div className="px-4 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block text-slate-700 hover:text-blue-600 font-bold text-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
