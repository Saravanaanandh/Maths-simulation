import React from 'react';
import { WormToken } from './WormToken';

interface WormCollectionProps {
    count: number;
    onWormClick?: () => void;
    active?: boolean;
}

export const WormCollection: React.FC<WormCollectionProps> = ({ count, onWormClick, active }) => {
    return (
        <div
            className={`
                bg-amber-100/50 p-6 rounded-3xl border-2 border-dashed border-amber-300
                min-h-[160px] flex flex-col items-center justify-center gap-4
                transition-all duration-300
                ${active ? 'ring-4 ring-amber-400 ring-opacity-50 scale-105 bg-amber-100' : ''}
            `}
        >
            <h3 className="text-amber-800 font-bold text-lg uppercase tracking-wider">
                Worm Pile ({count})
            </h3>

            <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="animate-in fade-in zoom-in duration-300">
                        <WormToken onClick={onWormClick} />
                    </div>
                ))}
            </div>

            {count === 0 && (
                <div className="text-slate-400 italic font-medium">
                    All worms distributed!
                </div>
            )}
        </div>
    );
};
