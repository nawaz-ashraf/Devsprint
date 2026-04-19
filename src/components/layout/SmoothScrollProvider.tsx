"use client";

import { type ReactNode, useEffect } from "react";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { setupSmoothScroll } from "@/lib/animations/scroll";

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const reducedMotion = useReducedMotionSafe();

    useEffect(() => {
        const cleanup = setupSmoothScroll({ enabled: !reducedMotion });
        return cleanup;
    }, [reducedMotion]);

    return <>{children}</>;
}
