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
        if (!enabled) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find(v => v.name.includes("Google US English")) ||
            voices.find(v => v.lang.startsWith("en-US")) ||
            voices[0];

        if (voice) utterance.voice = voice;

        utterance.rate = 1;
        utterance.pitch = 1.1;

        window.speechSynthesis.speak(utterance);
    }, [enabled, voices]);

    return { speak, enabled, setEnabled };
}
