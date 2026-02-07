import React from 'react';

interface ShopkeeperProps {
    mood: 'happy' | 'neutral' | 'waiting';
    message?: string;
}

export const Shopkeeper: React.FC<ShopkeeperProps> = ({ mood, message }) => {
    return (
        <div className="flex flex-col items-center relative">
            {/* Speech Bubble */}
            {message && (
                <div className="absolute -top-16 md:-top-24 left-30 bg-white px-4 md:px-6 py-2 md:py-4 rounded-3xl rounded-bl-none shadow-lg border-2 border-slate-200 animate-in fade-in zoom-in duration-300 max-w-[200px] md:max-w-md text-center z-20">
                    <p className="text-sm md:text-lg font-medium text-slate-700">{message}</p>
                </div>
            )}

            {/* Character */}
            <div className="text-6xl md:text-9xl filter drop-shadow-xl transition-transform duration-500 hover:scale-105 cursor-pointer">
                {mood === 'happy' ? '👨‍💼' : mood === 'waiting' ? '🤔' : '👨‍💼'}
            </div>

            <div className="bg-slate-200 px-8 py-2 rounded-full mt-4 font-bold text-slate-600 uppercase tracking-widest text-sm">
                Shopkeeper
            </div>
        </div>
    );
};
