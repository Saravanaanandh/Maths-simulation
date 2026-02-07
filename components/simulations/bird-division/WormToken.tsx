import React from 'react';

interface WormTokenProps {
    onClick?: () => void;
    selected?: boolean;
}

export const WormToken: React.FC<WormTokenProps> = ({ onClick, selected }) => {
    return (
        <div
            onClick={onClick}
            className={`
                cursor-pointer transition-all duration-200 
                ${selected ? 'scale-125 drop-shadow-lg' : 'hover:scale-110'}
            `}
        >
            <span className="text-4xl filter drop-shadow-sm">🪱</span>
        </div>
    );
};
