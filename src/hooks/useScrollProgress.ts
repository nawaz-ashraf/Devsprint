"use client";

import { useEffect, useState } from "react";

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function useScrollProgress(start = 0, end = 1) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const calculateProgress = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const baseProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

            const mappedProgress =
                end <= start
                    ? baseProgress
                    : clamp((baseProgress - start) / (end - start), 0, 1);

            setProgress(mappedProgress);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(calculateProgress);
            }
        };

        calculateProgress();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [end, start]);

    return progress;
}
