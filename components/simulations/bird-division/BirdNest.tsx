import React from 'react';
import { WormToken } from './WormToken';

interface BirdNestProps {
    id: number;
    wormCount: number;
    highlighted?: boolean;
    onReceiveWorm: () => void;
}

export const BirdNest: React.FC<BirdNestProps> = ({ id, wormCount, highlighted, onReceiveWorm }) => {
    return (
        <div
            onClick={onReceiveWorm}
            className={`
                relative flex flex-col items-center justify-end
                w-20 h-20 sm:w-32 sm:h-32 p-2 md:p-4
                transition-transform duration-200
                ${highlighted ? 'scale-110' : ''}
                cursor-pointer
            `}
        >
            {/* Bird Emoji / SVG */}
            <div className="absolute bottom-8 md:bottom-10 z-10 text-2xl sm:text-6xl animate-bounce-slow">
                🐦
            </div>

            {/* Nest Visual */}
            <div className="absolute bottom-0 w-16 h-8 sm:w-24 sm:h-12 bg-amber-700 rounded-b-full border-4 border-amber-800 shadow-md z-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-amber-600 opacity-50" />
            </div>

            {/* Worms in the nest */}
            <div className="absolute -top-4 w-full flex flex-wrap justify-center gap-1 z-20">
                {Array.from({ length: wormCount }).map((_, i) => (
                    <div key={i} className="transform scale-75">
                        <span className="text-2xl">🪱</span>
                    </div>
                ))}
            </div>

            {/* Counter Badge */}
            <div className="absolute -bottom-2 right-0 bg-white border-2 border-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-slate-700 shadow-sm z-30">
                {wormCount}
            </div>
        </div>
    );
};
