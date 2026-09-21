import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TypewriterProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

function Typewriter({
    text,
    speed = 30,
    onComplete,
}: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;

        setDisplayedText("");

        const timer = window.setInterval(() => {
            index++;

            setDisplayedText(text.slice(0, index));

            if (index >= text.length) {
                window.clearInterval(timer);

                if (onComplete) {
                    window.setTimeout(onComplete, 300);
                }
            }
        }, speed);

        return () => {
            window.clearInterval(timer);
        };
    }, [text, speed, onComplete]);

    return (
        <>
            <span>{displayedText}</span>

            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                █
            </motion.span>
        </>
    );
}

export default Typewriter;