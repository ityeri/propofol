import {useEffect, useState} from "react";
import {animate, type Easing, useMotionValue} from "framer-motion";


function createScrambledText(length: number): string {
    const chars = "!@#$%^&*()_+[]{};:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Array.from({length: length})
        .map(
            () => chars[Math.floor(Math.random() * chars.length)]
        ).join("")
}

export function useScramble(text: string, duration: number, delay: number, ease: Easing) {
    const [output, setOutput] = useState("");
    const progress = useMotionValue(0);

    useEffect(() => {
        progress.set(0)

        const controls = animate(progress, 1, {
            duration: duration,
            delay: delay,
            ease: ease,
            onUpdate: (latest) => {
                if (latest === 0) return

                const nextText = latest < 0.5 ?
                    createScrambledText(Math.floor(text.length * latest * 2))
                    : text.substring(0, Math.floor(((latest - 0.5) * 2) * text.length))
                    + createScrambledText(Math.ceil((1 - (latest - 0.5) * 2) * text.length))

                setOutput(nextText)

            },
        });

        return () => controls.stop();
    }, [text, duration, delay]);

    return output;
}