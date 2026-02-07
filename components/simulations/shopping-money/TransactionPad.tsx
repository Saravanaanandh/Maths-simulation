import React from 'react';
import { Button } from "@/components/ui/button";

interface TransactionPadProps {
    mode: 'payment' | 'change';
    onVerify: () => void;
    userValue: number;
    targetLabel: string;
    disabled?: boolean;
}

export const TransactionPad: React.FC<TransactionPadProps> = ({ mode, onVerify, userValue, targetLabel, disabled }) => {
    return (
        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex flex-col items-center gap-4 w-full">
            <h3 className="text-xl font-bold text-slate-700 uppercase tracking-wide">
                {targetLabel}
            </h3>

            <div className="bg-white w-full py-3 md:py-4 px-4 md:px-6 rounded-xl border-2 border-slate-300 text-center font-mono text-3xl md:text-4xl text-slate-800 shadow-inner">
                ₹{userValue}
            </div>

            <Button
                onClick={onVerify}
                disabled={disabled}
                size="lg"
                className={`w-full text-xl py-6 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-md
                    ${mode === 'payment' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
                `}
            >
                {mode === 'payment' ? 'Pay Now 💸' : 'Check Change ✅'}
            </Button>

            <p className="text-sm text-slate-400 font-medium">
                {mode === 'payment'
                    ? "Click money below to add to payment"
                    : "Click money below to calculate change"
                }
            </p>
        </div>
    );
};
