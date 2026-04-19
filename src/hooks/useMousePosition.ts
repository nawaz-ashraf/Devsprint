"use client";

import { useEffect, useState } from "react";

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
}

const defaultMousePosition: MousePosition = {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
};

export function useMousePosition() {
    const [mouse, setMouse] = useState<MousePosition>(defaultMousePosition);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const normalizedX = (event.clientX / window.innerWidth) * 2 - 1;
            const normalizedY = (event.clientY / window.innerHeight) * 2 - 1;

            setMouse({
                x: event.clientX,
                y: event.clientY,
                normalizedX,
                normalizedY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return mouse;
}
