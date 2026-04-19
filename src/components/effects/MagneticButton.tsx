"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export function MagneticButton({
    children,
    className,
    strength = 24,
}: MagneticButtonProps) {
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotionSafe();

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 240, damping: 24, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 240, damping: 24, mass: 0.4 });

    const disabled = isMobile || reducedMotion;

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const deltaX = event.clientX - (rect.left + rect.width / 2);
        const deltaY = event.clientY - (rect.top + rect.height / 2);

        x.set((deltaX / rect.width) * strength);
        y.set((deltaY / rect.height) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className={cn("inline-flex", className)}
        >
            {children}
        </motion.div>
    );
}
