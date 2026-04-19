"use client";

import {
    type ButtonHTMLAttributes,
    type PointerEvent as ReactPointerEvent,
    useState,
} from "react";

import { cn } from "@/lib/utils/cn";

interface Ripple {
    id: number;
    x: number;
    y: number;
    size: number;
}

export function RippleButton({
    children,
    className,
    onPointerDown,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const createRipple = (event: ReactPointerEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.6;

        const ripple: Ripple = {
            id: Date.now() + Math.random(),
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
            size,
        };

        setRipples((prev) => [...prev, ripple]);

        window.setTimeout(() => {
            setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
        }, 620);
    };

    const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
        createRipple(event);
        onPointerDown?.(event);
    };

    return (
        <button
            {...props}
            onPointerDown={handlePointerDown}
            className={cn(
                "group relative isolate overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-300",
                className
            )}
        >
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="pointer-events-none absolute animate-[ripple_620ms_ease-out] rounded-full bg-white/30"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                    }}
                />
            ))}
            <span className="relative z-10">{children}</span>
        </button>
    );
}
