"use client";

import { useReducedMotion } from "framer-motion";

export function useReducedMotionSafe() {
    return useReducedMotion() ?? false;
}
