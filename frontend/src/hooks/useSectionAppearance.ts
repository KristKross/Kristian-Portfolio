import { useEffect, useRef, useState } from "react";

export function useSectionAppearance(
    delays: number[] = [300],
    threshold = 0.2
) {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState<boolean[]>(
        () => delays.map(() => false)
    );

    const delaysRef = useRef(delays);
    delaysRef.current = delays;

    useEffect(() => {
        const isDesktop = window.matchMedia(
            "(min-width: 1024px)"
        ).matches;

        if (!isDesktop) {
            setVisible(delays.map(() => true));
            return;
        }

        const section = sectionRef.current;
        if (!section) return;

        const timers: ReturnType<typeof setTimeout>[] = [];

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                delaysRef.current.forEach((delay, index) => {
                    timers.push(
                        setTimeout(() => {
                            setVisible((current) => {
                                if (current[index]) return current;

                                const next = [...current];
                                next[index] = true;
                                return next;
                            });
                        }, delay)
                    );
                });

                observer.disconnect();
            },
            {
                threshold,
            }
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
            timers.forEach(clearTimeout);
        };
    }, [threshold, delays]);

    return {
        sectionRef,
        visible,
    };
}