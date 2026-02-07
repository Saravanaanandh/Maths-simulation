import { useCallback, useEffect, useState } from "react";

export function useVoiceAssistant() {
    const [enabled, setEnabled] = useState(true);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            const available = window.speechSynthesis.getVoices();
            setVoices(available);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speak = useCallback((text: string) => {
        return new Promise<void>((resolve) => {
            if (!enabled) {
                resolve();
                return;
            }

            // Stop any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a friendly English voice (Google US English or similar often sounds good)
            const voice = voices.find(v => v.name.includes("Google US English")) ||
                voices.find(v => v.lang.startsWith("en-US")) ||
                voices[0];

            if (voice) utterance.voice = voice;

            utterance.rate = 1;
            utterance.pitch = 1.2; // Slightly higher pitch for friendliness

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve(); // Resolve on error too to prevent hanging forver

            window.speechSynthesis.speak(utterance);
        });
    }, [enabled, voices]);

    return { speak, enabled, setEnabled };
}
