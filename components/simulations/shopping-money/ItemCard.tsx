import React from 'react';

interface ItemCardProps {
    name: string;
    price: number;
    emoji: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({ name, price, emoji }) => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-3xl shadow-lg border-4 border-slate-100 flex flex-col items-center gap-2 md:gap-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="text-4xl md:text-8xl filter drop-shadow-md animate-bounce-slow">
                {emoji}
            </div>
            <div className="text-center">
                <h3 className="text-lg md:text-2xl font-bold text-slate-700">{name}</h3>
                <div className="mt-2 text-2xl md:text-4xl font-black text-green-600 bg-green-50 px-4 md:px-6 py-1 md:py-2 rounded-xl border-2 border-green-100 shadow-inner">
                    ₹{price}
                </div>
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">
                Price Tag
            </div>
        </div>
    );
};
