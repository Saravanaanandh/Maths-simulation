import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Volume2, VolumeX, ArrowLeft, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import { useVoiceAssistant } from "./VoiceAssistant";
import { ItemCard } from "./ItemCard";
import { Money } from "./Money";
import { Shopkeeper } from "./Shopkeeper";
import { TransactionPad } from "./TransactionPad";

const MAX_LEVEL = 30;

interface LevelData {
    itemName: string;
    itemPrice: number;
    itemEmoji: string;
    requiredPayment: number; // If 0, user chooses. If >0, user is given this amount to pay with.
}

const ITEMS = [
    { name: "Candy", emoji: "🍬", basePrice: 1 },
    { name: "Apple", emoji: "🍎", basePrice: 2 },
    { name: "Toy Car", emoji: "🏎️", basePrice: 5 },
    { name: "Book", emoji: "📚", basePrice: 8 },
    { name: "Ball", emoji: "⚽", basePrice: 10 },
    { name: "T-Shirt", emoji: "👕", basePrice: 15 },
    { name: "Hat", emoji: "🧢", basePrice: 12 },
    { name: "Video Game", emoji: "🎮", basePrice: 45 },
    { name: "Headphones", emoji: "🎧", basePrice: 30 },
    { name: "Sneakers", emoji: "👟", basePrice: 50 },
];

const GENERATE_LEVEL = (level: number): LevelData => {
    // Generate Item
    const itemIndex = (level - 1) % ITEMS.length;
    const baseItem = ITEMS[itemIndex];

    let price = baseItem.basePrice;
    let payment = 0;

    // Difficulty Scaling
    if (level <= 5) {
        // Levels 1-5: Exact change or simple +1/+2 over
        price = Math.ceil(level * 1.5); // 2, 3, 5, 6, 8
        payment = Math.ceil(price / 5) * 5; // Next multiple of 5 usually
        if (payment === price) payment += 5; // Ensure some change needed often
    } else if (level <= 10) {
        price = Math.floor(Math.random() * 10) + 5; // 5-15
        payment = price + (Math.floor(Math.random() * 3) + 1); // Random change needed
        // Round payment to nearest bill often? 
        // For simulation simplicity, let's say user "Give" a specific bill
        if (Math.random() > 0.5) payment = Math.ceil(price / 10) * 10;
    } else if (level <= 20) {
        price = Math.floor(Math.random() * 20) + 10; // 10-30
        payment = Math.ceil(price / 10) * 10;
        if (payment === price) payment += 10;
    } else {
        price = Math.floor(Math.random() * 40) + 20; // 20-60
        payment = 100; // Pay with $100 bill often
    }

    return {
        itemName: baseItem.name,
        itemEmoji: baseItem.emoji,
        itemPrice: price,
        requiredPayment: payment
    };
};

export function ShoppingSimulator() {
    const { speak, enabled: voiceEnabled, setEnabled: setVoiceEnabled } = useVoiceAssistant();

    // Game State
    const [currentLevel, setCurrentLevel] = useState(1);
    const [levelData, setLevelData] = useState<LevelData>(GENERATE_LEVEL(1));
    const [step, setStep] = useState<'view' | 'pay' | 'change' | 'complete'>('view');

    const [moneyGiven, setMoneyGiven] = useState(0);
    const [changeCalculated, setChangeCalculated] = useState(0);
    const [shopkeeperMessage, setShopkeeperMessage] = useState("Welcome to my shop!");

    useEffect(() => {
        startLevel(currentLevel);
    }, [currentLevel]);

    const startLevel = (level: number) => {
        const data = GENERATE_LEVEL(level);
        setLevelData(data);
        setStep('view');
        setMoneyGiven(0);
        setChangeCalculated(0);
        setShopkeeperMessage(`Hi! That ${data.itemName} costs ₹${data.itemPrice}.`);
        speak(`Level ${level}. The ${data.itemName} is ${data.itemPrice} rupees.`);
    };

    const handleAddMoney = (amount: number, type: 'payment' | 'change') => {
        if (type === 'payment') {
            setMoneyGiven(prev => prev + amount);
            speak(`₹${amount}`);
        } else {
            setChangeCalculated(prev => prev + amount);
            speak(`₹${amount}`);
        }
    };

    const handleVerifyPayment = () => {
        if (moneyGiven < levelData.itemPrice) {
            setShopkeeperMessage("That's not enough money!");
            speak("That is not enough money.");
            return;
        }

        setShopkeeperMessage(`Thanks! You gave me ₹${moneyGiven}. Now, calculate the change.`);
        speak(`You gave me ${moneyGiven} rupees. How much change do I owe you?`);
        setStep('change');
    };

    const handleVerifyChange = () => {
        const correctChange = moneyGiven - levelData.itemPrice;

        if (changeCalculated === correctChange) {
            setStep('complete');
            setShopkeeperMessage("Correct! Here is your item.");
            speak("Correct! Here is your item. Great job!");
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F59E0B', '#10B981', '#3B82F6']
            });
        } else {
            if (changeCalculated < correctChange) {
                setShopkeeperMessage("You need more change!");
                speak("I owe you more change than that.");
            } else {
                setShopkeeperMessage("That's too much change!");
                speak("That is too much change. Count again.");
            }
        }
    };

    const handleNextLevel = () => {
        if (currentLevel < MAX_LEVEL) setCurrentLevel(prev => prev + 1);
    };

    const handlePrevLevel = () => {
        if (currentLevel > 1) setCurrentLevel(prev => prev - 1);
    };

    // Auto-fill payment for levels where "requiredPayment" is set?
    // User requested: "boy going to shop... give the amount... how much pay and shopkeeper how much return".
    // This implies user plays role of Boy paying? Or Shopkeeper calculating change?
    // Let's stick to: User plays Boy. 
    // Step 1: User pays (drags money to counter).
    // Step 2: User calculates expected change? Or verifies change?
    // "how much should he pay and the shopkeeper how much will return"
    // Let's keep manual payment.

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-slate-100 min-h-[600px] flex flex-col">

            {/* Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                    <Button variant="ghost" size="icon" onClick={handlePrevLevel} disabled={currentLevel === 1}>
                        <ArrowLeft size={20} />
                    </Button>
                    <div className="flex flex-col items-center px-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Level</span>
                        <span className="text-xl font-black text-slate-700">{currentLevel} <span className="text-slate-300">/ {MAX_LEVEL}</span></span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleNextLevel} disabled={currentLevel === MAX_LEVEL}>
                        <ArrowRight size={20} />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={() => setVoiceEnabled(!voiceEnabled)} variant="outline" size="icon">
                        {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </Button>
                    <Button onClick={() => startLevel(currentLevel)} variant="ghost">
                        <RefreshCw size={20} />
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-8 flex-grow flex flex-col lg:flex-row gap-8">

                {/* Left: Shop Context */}
                <div className="flex-1 flex flex-col items-center gap-8">
                    <Shopkeeper mood={step === 'complete' ? 'happy' : 'neutral'} message={shopkeeperMessage} />
                    <ItemCard name={levelData.itemName} price={levelData.itemPrice} emoji={levelData.itemEmoji} />
                </div>

                {/* Right: Interaction */}
                <div className="flex-1 flex flex-col gap-6">

                    {step === 'view' && (
                        <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100 text-center animate-in slide-in-from-right">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Pay for the Item</h3>
                            <p className="text-blue-700 mb-6">Click the money to pay <strong>₹ {levelData.itemPrice}</strong> or more.</p>
                            <Button onClick={() => setStep('pay')} size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-xl py-6 rounded-xl">
                                Start Payment
                            </Button>
                        </div>
                    )}

                    {step === 'pay' && (
                        <div className="animate-in slide-in-from-right">
                            <TransactionPad
                                mode="payment"
                                userValue={moneyGiven}
                                targetLabel="Total Paid"
                                onVerify={handleVerifyPayment}
                            />
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6 w-full max-w-md mx-auto">
                                {[1, 5, 10, 20, 50, 100].map(val => (
                                    <div key={val} className="flex justify-center w-full">
                                        <Money type="bill" value={val} onClick={() => handleAddMoney(val, 'payment')} />
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" onClick={() => setMoneyGiven(0)} className="w-full mt-2 text-red-400">Clear</Button>
                        </div>
                    )}

                    {step === 'change' && (
                        <div className="animate-in slide-in-from-right">
                            <div className="bg-slate-100 p-4 rounded-xl mb-4 flex justify-between items-center">
                                <span className="text-slate-500">Price: <strong className="text-slate-800">₹{levelData.itemPrice}</strong></span>
                                <span className="text-slate-500">Paid: <strong className="text-blue-600">₹{moneyGiven}</strong></span>
                            </div>

                            <TransactionPad
                                mode="change"
                                userValue={changeCalculated}
                                targetLabel="Example Change"
                                onVerify={handleVerifyChange}
                            />

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-6 w-full max-w-md mx-auto">
                                {[1, 5, 10, 20].map(val => (
                                    <div key={val} className="flex justify-center w-full scale-90 md:scale-100">
                                        <Money type="bill" value={val} onClick={() => handleAddMoney(val, 'change')} />
                                    </div>
                                ))}
                                {/* Add Coins if needed for higher levels later */}
                            </div>
                            <Button variant="ghost" onClick={() => setChangeCalculated(0)} className="w-full mt-2 text-red-400">Clear</Button>
                        </div>
                    )}

                    {step === 'complete' && (
                        <div className="flex flex-col items-center justify-center h-full animate-in zoom-in">
                            <h2 className="text-3xl font-black text-green-500 mb-4">Transaction Complete!</h2>
                            <p className="text-slate-500 mb-8">You bought the {levelData.itemName}!</p>
                            <Button onClick={handleNextLevel} size="lg" className="bg-green-500 hover:bg-green-600 shadow-lg text-xl py-4 px-8 rounded-full">
                                Next Level <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
