"use client";

import { useState } from "react";

export type DeviceTier = "low" | "medium" | "high";

const getDeviceTier = (): DeviceTier => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    if (cores <= 2 || memory <= 2) return "low";
    if (cores <= 4 || memory <= 4) return "medium";
    return "high";
};

export function useDeviceTier() {
    const [tier] = useState<DeviceTier>(() => {
        if (typeof navigator === "undefined") return "medium";
        return getDeviceTier();
    });

    return tier;
}
