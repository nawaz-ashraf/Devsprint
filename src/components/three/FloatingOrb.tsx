"use client";

import { Edges, Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FloatingOrbProps {
    scrollProgress: number;
    isConstrained: boolean;
    reducedMotion: boolean;
}

const layerOffsets = [-0.44, -0.22, 0, 0.22, 0.44] as const;
const sideNodePositions: Array<[number, number, number]> = [
    [-0.92, 0.62, 0],
    [0.92, 0.62, 0],
    [-0.92, -0.62, 0],
    [0.92, -0.62, 0],
];

export function FloatingOrb({
    scrollProgress,
    isConstrained,
    reducedMotion,
}: FloatingOrbProps) {
    const groupRef = useRef<THREE.Group>(null);
    const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
    const panelRefs = useRef<Array<THREE.Mesh | null>>([]);
    const sideNodeRefs = useRef<Array<THREE.Mesh | null>>([]);
    const targetScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);

    useFrame((state) => {
        if (!groupRef.current) return;

        const pointerInfluenceX = state.pointer.y * 0.4;
        const pointerInfluenceY = state.pointer.x * 0.65;

        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            pointerInfluenceX + scrollProgress * 0.5,
            0.06
        );

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            pointerInfluenceY + scrollProgress * 1.1,
            0.06
        );

        const floatingY = reducedMotion
            ? 0
            : Math.sin(state.clock.elapsedTime * 1.1) * 0.16 - scrollProgress * 0.34;

        groupRef.current.position.y = THREE.MathUtils.lerp(
            groupRef.current.position.y,
            floatingY,
            0.06
        );

        const scale = 1 + scrollProgress * 0.16;
        targetScale.setScalar(scale);
        groupRef.current.scale.lerp(targetScale, 0.06);

        if (coreMaterialRef.current && !isConstrained && !reducedMotion) {
            const hue = 0.58 + Math.sin(state.clock.elapsedTime * 0.34) * 0.08;
            coreMaterialRef.current.color.setHSL(hue, 0.92, 0.66);
            coreMaterialRef.current.emissive.setHSL(hue + 0.04, 0.88, 0.44);
        }

        panelRefs.current.forEach((panel, index) => {
            if (!panel) return;

            const targetX = reducedMotion
                ? 0
                : Math.sin(state.clock.elapsedTime * 1.8 + index * 0.8) * 0.05;

            panel.position.x = THREE.MathUtils.lerp(panel.position.x, targetX, 0.1);

            panel.rotation.z = THREE.MathUtils.lerp(
                panel.rotation.z,
                reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.9 + index) * 0.04,
                0.08
            );
        });

        sideNodeRefs.current.forEach((node, index) => {
            if (!node) return;

            node.rotation.x += reducedMotion ? 0.001 : 0.012;
            node.rotation.y += reducedMotion ? 0.001 : 0.018;

            node.position.z = THREE.MathUtils.lerp(
                node.position.z,
                reducedMotion
                    ? 0
                    : Math.sin(state.clock.elapsedTime * 1.2 + index * 0.9) * 0.12,
                0.1
            );
        });

        if (!reducedMotion) {
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                Math.sin(state.clock.elapsedTime * 0.28) * 0.08,
                0.04
            );
        }
    });

    return (
        <group ref={groupRef}>
            <Float
                speed={reducedMotion ? 0.35 : 1.3}
                floatIntensity={reducedMotion ? 0 : isConstrained ? 0.12 : 0.34}
                rotationIntensity={reducedMotion ? 0 : 0.2}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.34, 1.34, 1.34, 3, 3, 3]} />
                    <meshStandardMaterial
                        ref={coreMaterialRef}
                        color="#6ca8ff"
                        roughness={0.18}
                        metalness={0.82}
                        emissive="#5f69ff"
                        emissiveIntensity={0.42}
                    />
                    {!isConstrained && !reducedMotion && (
                        <Edges color="#a7d6ff" scale={1.005} />
                    )}
                </mesh>

                <group position={[0, 0, 0.84]}>
                    {layerOffsets.map((y, index) => (
                        <mesh
                            key={`layer-${y}`}
                            ref={(node) => {
                                panelRefs.current[index] = node;
                            }}
                            position={[0, y, 0]}
                        >
                            <boxGeometry args={[0.98, 0.04, 0.16]} />
                            <meshStandardMaterial
                                color={index % 2 === 0 ? "#9ab0ff" : "#91dcff"}
                                emissive={index % 2 === 0 ? "#5f63ff" : "#22d3ee"}
                                emissiveIntensity={0.44}
                                roughness={0.25}
                                metalness={0.55}
                            />
                        </mesh>
                    ))}
                </group>

                {sideNodePositions.map((position, index) => (
                    <mesh
                        key={`node-${position.join("-")}`}
                        ref={(node) => {
                            sideNodeRefs.current[index] = node;
                        }}
                        position={position}
                    >
                        <boxGeometry args={[0.16, 0.16, 0.16]} />
                        <meshStandardMaterial
                            color="#9cd8ff"
                            emissive="#4a8dff"
                            emissiveIntensity={0.48}
                            metalness={0.8}
                            roughness={0.22}
                        />
                    </mesh>
                ))}

                <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.9}>
                    <torusGeometry args={[1.05, 0.025, 24, isConstrained ? 120 : 240]} />
                    <meshBasicMaterial color="#a994ff" transparent opacity={0.52} />
                </mesh>

                {!isConstrained && (
                    <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={1.58}>
                        <torusGeometry args={[1.02, 0.012, 16, 180]} />
                        <meshBasicMaterial color="#57d6ff" transparent opacity={0.28} />
                    </mesh>
                )}

                {!isConstrained && !reducedMotion && (
                    <Sparkles
                        count={46}
                        scale={3.8}
                        size={1.6}
                        speed={0.4}
                        opacity={0.42}
                        color="#8ab4ff"
                    />
                )}
            </Float>
        </group>
    );
}
