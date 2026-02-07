import React from 'react';

interface MoneyProps {
    value: number;
    type: 'coin' | 'bill';
    onClick?: () => void;
    selected?: boolean;
    disabled?: boolean;
}

export const Money: React.FC<MoneyProps> = ({ value, type, onClick, selected, disabled }) => {
    const isBill = type === 'bill';

    // Color mapping for bills
    const billColor =
        value === 1 ? 'bg-green-100 border-green-300 text-green-800' :
            value === 5 ? 'bg-indigo-100 border-indigo-300 text-indigo-800' :
                value === 10 ? 'bg-amber-100 border-amber-300 text-amber-800' :
                    value === 20 ? 'bg-emerald-100 border-emerald-300 text-emerald-800' :
                        value === 50 ? 'bg-rose-100 border-rose-300 text-rose-800' :
                            'bg-slate-100 border-slate-300 text-slate-800';

    if (isBill) {
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={`
                    relative w-full min-w-[80px] md:min-w-[100px] max-w-[140px] h-12 md:h-16 rounded-lg border-2 shadow-sm flex items-center justify-between px-2 md:px-3
                    transition-all duration-200 transform
                    ${billColor}
                    ${selected ? 'ring-4 ring-blue-400 scale-110 z-10' : 'hover:scale-105 hover:shadow-md'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <span className="font-bold text-base md:text-lg">₹{value}</span>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/30 flex items-center justify-center text-xs opacity-50 border border-current">
                    💵
                </div>
                <span className="font-bold text-base md:text-lg">₹{value}</span>
            </button>
        );
    }

    // Coins
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                w-12 h-12 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center shadow-sm
                transition-all duration-200 transform
                bg-amber-300 border-amber-500 text-amber-900
                ${selected ? 'ring-4 ring-blue-400 scale-110 z-10' : 'hover:scale-105 hover:shadow-md'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            <span className="font-black text-lg md:text-xl">₹{value}</span>
        </button>
    );
};
