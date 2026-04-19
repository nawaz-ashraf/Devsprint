"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export function CursorGlow() {
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotionSafe();

    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    const smoothX = useSpring(mouseX, { stiffness: 220, damping: 30, mass: 0.4 });
    const smoothY = useSpring(mouseY, { stiffness: 220, damping: 30, mass: 0.4 });

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX);
            mouseY.set(event.clientY);
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [mouseX, mouseY]);

    if (isMobile || reducedMotion) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-30 hidden md:block" aria-hidden>
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="absolute left-0 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.26)_0%,_rgba(139,92,246,0.18)_42%,_rgba(6,6,20,0)_72%)] blur-3xl"
            />
        </div>
    );
}
