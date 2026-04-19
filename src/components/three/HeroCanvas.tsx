"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";

import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

import { FloatingOrb } from "./FloatingOrb";

interface HeroCanvasProps {
    scrollProgress: number;
}

function detectWebGLSupport() {
    if (typeof document === "undefined") return true;

    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
    const isMobile = useIsMobile();
    const reducedMotion = useReducedMotionSafe();
    const deviceTier = useDeviceTier();
    const [webglSupported] = useState<boolean>(() => detectWebGLSupport());

    const isConstrained = isMobile || deviceTier === "low";

    if (!webglSupported) {
        return (
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(79,116,255,0.48),transparent_48%),radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.42),transparent_54%),linear-gradient(180deg,rgba(10,10,28,0.95),rgba(8,8,22,0.9))]" />
        );
    }

    return (
        <Canvas
            className="absolute inset-0"
            dpr={isConstrained ? [1, 1.2] : [1, 1.8]}
            camera={{ position: [0, 0, 4.4], fov: 48 }}
            gl={{
                antialias: !isConstrained,
                alpha: true,
                powerPreference: "high-performance",
            }}
            performance={{ min: 0.4 }}
            frameloop={reducedMotion ? "demand" : "always"}
        >
            <color attach="background" args={["#060615"]} />
            <ambientLight intensity={0.9} />
            <directionalLight position={[2.2, 2.4, 2]} intensity={1.12} color="#99b7ff" />
            <pointLight position={[-2.8, -1.4, 2.4]} intensity={1.08} color="#7f6bff" />

            <Suspense fallback={null}>
                <FloatingOrb
                    scrollProgress={scrollProgress}
                    isConstrained={isConstrained}
                    reducedMotion={reducedMotion}
                />
            </Suspense>
        </Canvas>
    );
}
