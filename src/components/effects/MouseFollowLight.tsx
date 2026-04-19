"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

export function MouseFollowLight() {
    const isMobile = useIsMobile();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const smoothX = useSpring(x, { stiffness: 160, damping: 26, mass: 0.5 });
    const smoothY = useSpring(y, { stiffness: 160, damping: 26, mass: 0.5 });

    const background = useMotionTemplate`radial-gradient(700px circle at ${smoothX}px ${smoothY}px, rgba(76, 119, 255, 0.22) 0%, rgba(125, 94, 255, 0.15) 28%, transparent 60%)`;

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
        };

        x.set(window.innerWidth / 2);
        y.set(window.innerHeight / 3);

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [x, y]);

    if (isMobile) {
        return null;
    }

    return (
        <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[2]"
            style={{ background }}
        />
    );
}
