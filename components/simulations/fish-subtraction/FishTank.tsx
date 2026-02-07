import { SmallFish } from "./SmallFish";
import { LargeFish } from "./LargeFish";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface FishTankProps {
    totalFish: number;
    eatenCount: number;
    isEating: boolean;
    largeFishPosition: number; // Not used directly in grid calculation anymore, we use eatenCount
}

export function FishTank({ totalFish, eatenCount, isEating }: FishTankProps) {
    // Constants for grid sizing
    const FISH_WIDTH = 80; // px
    const FISH_HEIGHT = 60; // px
    const COLS = 10; // Max fish per row

    // Calculate specific target position
    // The fish we are currently targeting/eating is at index: (totalFish - 1) - eatenCount
    // If eatenCount = 0, target is Last Fish.
    // If eatenCount = 1, target is Second Last Fish.

    // However, visually we want the fish to stay until eaten.
    // The Large Fish should hover over the "next to be eaten" spot or the "just eaten" spot?
    // Let's make it cover the "gap" created or the fish being eaten.

    // We clamp the target index to be safe
    const targetIndex = Math.max(0, totalFish - 1 - eatenCount);

    // Grid Coordinates of the target
    // We assume LTR filling.
    const targetRow = Math.floor(targetIndex / COLS);
    const targetCol = targetIndex % COLS;

    // Calculate absolute position for Large Fish within the relative container
    // We need to account for the container padding.
    // Let's say padding is P.
    // Left = P + targetCol * WIDTH
    // Top = P + targetRow * HEIGHT

    // We need to render the small fish in the same grid.

    return (
        <div className="w-fit max-w-full mx-auto bg-gradient-to-b from-blue-200 to-blue-500 rounded-3xl relative overflow-hidden shadow-inner border-4 border-blue-600 p-4 md:p-8 min-h-[200px] flex flex-col justify-center">
            {/* Background Decor */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-[url('https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u1f33f.png')] bg-repeat-x opacity-30 select-none pointer-events-none"></div>
            <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white opacity-40 animate-pulse"></div>
            <div className="absolute top-20 right-20 w-8 h-8 rounded-full bg-white opacity-30 animate-bounce"></div>

            {/* Grid Container */}
            <div
                className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-1 md:gap-2 mx-auto justify-center relative z-0 w-full max-w-5xl"
            >
            </div>

            {/* Retrying with Flex Wrap Container + Calculated Absolute Position for Big Fish */}
            {/*<div
                className="flex flex-wrap gap-2 justify-start content-start relative mx-auto"
                style={{ width: 'fit-content', maxWidth: '100%' }}
            >
                {Array.from({ length: totalFish }).map((_, i) => {
                    // Fish are rendered 0 to Total.
                    // 0 is Top-Left. Last is Bottom-Right.
                    // Eaten Logic: We subtract from the END (Bottom-Right).
                    // So if index >= totalFish - eatenCount, it is hidden.
                    const isEaten = i >= totalFish - eatenCount;

                    return (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center justify-center transition-all duration-300",
                                isEaten ? "opacity-0 scale-50" : "opacity-100 scale-100"
                            )}
                            style={{ width: FISH_WIDTH, height: FISH_HEIGHT }}
                        >
                            <SmallFish />
                        </div>
                    );
                })}

                 Large Fish Absolute Overlay - Only visible if not finished (or always?) */}
            {/* We position it relative to the Last Visible fish? */}
            {/* Actually, calculating x/y from purely CSS structure is hard in React without refs. */}
            {/* ALTERNATIVE: Render the Large Fish *inside* the list at the current target position? */}

            {/* Let's try "The Shadow Follower" approach. */}
            {/* We render a duplicate invisible grid, but at the target index we render the Big Fish absolute. */}
            {/* No that's duplicate DOM. */}

            {/* Simplest Visual Fix: 
             If we use Flex-Wrap, the "end" is the last item.
             We can place the Big Fish fixed at the "End of the list". 
             If items disappear (display:none), it moves automatically! 
             But we want them to "fade out", not shift layout.
             
             So we keep layout space (opacity:0).
             Meaning the Big Fish needs to move to the specific cell.
         
            </div>*/}

            {/* 
          Since we can't easily X/Y coordinate without measuring refs in a responsive wrapper...
          Let's use a "Cursor" element in the grid?
          If we insert the Big Fish into the array at 'targetIndex'?
          That would shift elements. 
          
          Let's go with the Grid Calculation logic, but force the container width to match specific breakpoints 
          so our math holds up.
        */}

            <div className="absolute top-10 left-0 w-full h-full pointer-events-none overflow-hidden">
                {/* 
              We will render the Big Fish via a CSS variable controlled translation? 
              Actually, let's use the 'style' prop on the Big Fish with calc().
              
              We need to know the 'row' and 'col' of the target.
              Row = Math.floor(targetIndex / actualCols)
              Col = targetIndex % actualCols
              
              We can force 'actualCols' by setting the container max-width.
              Let's force 10 cols for Desktop, 5 for Mobile.
            */}
            </div>

            {/* Re-implementing simplified tank: Just the flex wrapping. Big fish stays at the "Eating Front". */}
            <ResponsiveFishGrid
                totalFish={totalFish}
                eatenCount={eatenCount}
                isEating={isEating}
            />
        </div>
    );
}

// Sub-component to handle the tricky layout logic
function ResponsiveFishGrid({ totalFish, eatenCount, isEating }: { totalFish: number, eatenCount: number, isEating: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bigFishStyle, setBigFishStyle] = useState({ top: 0, left: 0, opacity: 0 });
    const [cols, setCols] = useState(10);

    // Measure columns on resize
    // Measure columns on resize - simplified for Single Row
    useEffect(() => {
        // We enforce single row, so "cols" is effectively totalFish or just infinite.
        // We don't need to recalculate cols based on width anymore.
        setCols(totalFish);
    }, [totalFish]);

    // Calculate Big Fish Position
    useEffect(() => {
        // Target the fish that is about to be eaten (or was just eaten)
        // Target Index = totalFish - 1 - eatenCount.
        // But we want the Big Fish to be slightly TO THE RIGHT of the target fish (facing left).
        // So it looks like it's approaching it.

        // Actually, if it eats Right -> Left...
        // [0] [1] [2] ... [Target] [BigFish]
        // So BigFish should be at TargetIndex + 1?

        const targetFishIndex = totalFish - 1 - eatenCount;

        // Determine grid pos
        // Determine grid pos - Single Row logic
        // Row is always 0. Col is the index.
        const row = 0;
        const col = targetFishIndex % totalFish; // effectively just targetFishIndex

        // Base position
        const fishW = 60;
        const fishH = 50;
        const gap = 8; // matches flex gap-2 (8px)

        // Values match the mapped dimensions below
        const top = row * (fishH + gap);
        // We want Big Fish to be to the RIGHT of the target fish, moving Left.
        // Target is at: PaddingLeft + col * (fishW + gap)
        // Big Fish starts at: PaddingLeft + (col + 1) * (fishW + gap)

        const paddingLeft = 32; // pl-8 = 32px
        const left = paddingLeft + (col + 1) * (fishW + gap);

        setBigFishStyle({
            top: top - 20, // Adjustment to center vertically with fish
            left: left + 20, // Adjustment to overlap slightly
            opacity: 1
        });

    }, [totalFish, eatenCount]);

    return (
        <div className="relative mx-auto overflow-hidden pb-4 hide-scrollbar" ref={containerRef} style={{ width: '100%', maxWidth: '100%' }}>
            <div
                className="flex flex-nowrap gap-2 items-center justify-start min-w-max pl-8 pr-32"
                style={{
                    // Force minimum width to fit all fish + padding
                    // This ensures single row behavior
                }}
            >
                {Array.from({ length: totalFish }).map((_, i) => {
                    const isEaten = i >= totalFish - eatenCount;
                    return (
                        <div
                            key={i}
                            className={cn("transition-all duration-300 relative w-10 h-8 md:w-[60px] md:h-[50px]", isEaten ? "opacity-20 grayscale" : "")}
                        >
                            <SmallFish />
                        </div>
                    );
                })}
            </div>

            {/* The Big Fish */}
            <div
                className="absolute transition-all duration-500 ease-out pointer-events-none z-20"
                style={{
                    top: bigFishStyle.top,
                    left: bigFishStyle.left,
                    width: 120, // Bigger than small fish
                    height: 90
                }}
            >
                <LargeFish isEating={isEating} className="" /> {/* Native Left Facing */}
            </div>
        </div>
    );
}
