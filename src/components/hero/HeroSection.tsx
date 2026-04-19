"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

import { MagneticButton } from "@/components/effects/MagneticButton";
import { RippleButton } from "@/components/effects/RippleButton";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { trackEvent } from "@/lib/analytics/track";
import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";
import { scrollToId } from "@/lib/animations/scroll";

const HeroCanvas = dynamic(
    () => import("@/components/three/HeroCanvas").then((mod) => mod.HeroCanvas),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_15%,rgba(78,117,255,0.38),transparent_48%),radial-gradient(circle_at_80%_25%,rgba(139,92,246,0.28),transparent_45%),linear-gradient(180deg,rgba(8,10,28,0.85),rgba(9,9,22,0.9))]" />
        ),
    }
);

export function HeroSection() {
    const heroProgress = useScrollProgress(0, 0.45);

    const handleStartProjectClick = () => {
        trackEvent("cta_start_project_clicked", {
            section: "hero",
        });
        scrollToId("contact");
    };

    const handleViewWorkClick = () => {
        trackEvent("cta_view_work_clicked", {
            section: "hero",
        });
        scrollToId("projects");
    };

    return (
        <section
            id="hero"
            data-story-section
            className="relative flex min-h-[100svh] items-center overflow-hidden px-6 py-24 md:px-10"
        >
            <div className="story-grid pointer-events-none absolute inset-0 opacity-[0.08]" data-parallax="background" />

            <div
                className="floating-orb pointer-events-none absolute -left-14 top-14 h-56 w-56 bg-cyan-400/24"
                data-parallax="foreground"
            />
            <div
                className="floating-orb pointer-events-none absolute -right-12 bottom-8 h-64 w-64 bg-violet-400/24"
                data-parallax="background"
            />

            <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <motion.div
                    variants={sectionStagger}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 space-y-8"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100/90"
                        data-reveal
                    >
                        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                        Premium Coding-Focused Developer
                    </motion.p>

                    <motion.h1
                        variants={fadeUpVariants}
                        className="neon-text max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
                        data-reveal
                    >
                        I build modern apps and websites that solve real problems.
                    </motion.h1>

                    <motion.p
                        variants={fadeUpVariants}
                        className="max-w-xl text-base leading-relaxed text-[#b4c2e6] sm:text-lg"
                        data-reveal
                    >
                        Flutter-first mobile products, high-performance web builds, and clean
                        UX systems engineered to convert visitors into real project leads.
                    </motion.p>

                    <motion.div
                        variants={fadeUpVariants}
                        className="flex flex-wrap items-center gap-4"
                        data-reveal
                    >
                        <MagneticButton>
                            <RippleButton
                                type="button"
                                onClick={handleViewWorkClick}
                                className="glow-border bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.4)]"
                            >
                                <span className="inline-flex items-center gap-2">
                                    View Projects
                                    <ArrowRight className="h-4 w-4" />
                                </span>
                            </RippleButton>
                        </MagneticButton>

                        <MagneticButton>
                            <RippleButton
                                type="button"
                                onClick={handleStartProjectClick}
                                className="glass-panel border border-white/20 bg-white/5 text-white"
                            >
                                Contact Me
                            </RippleButton>
                        </MagneticButton>
                    </motion.div>

                    <motion.div
                        variants={fadeUpVariants}
                        className="grid max-w-xl gap-3 sm:grid-cols-3"
                        data-reveal
                    >
                        {[
                            ["6", "Flutter apps in pipeline"],
                            ["40+", "Projects shipped"],
                            ["98%", "Client satisfaction"],
                            ["Code + UX", "Conversion-focused"],
                        ].map(([value, label]) => (
                            <div
                                key={label}
                                className="glass-panel rounded-2xl border border-white/10 px-4 py-3"
                            >
                                <p className="text-lg font-semibold text-cyan-100">{value}</p>
                                <p className="text-xs text-[#93a3c9]">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <div className="relative mx-auto h-[420px] w-full max-w-[640px] rounded-[2rem] border border-white/10 bg-[#07071b]/70 md:h-[560px]">
                    <div className="pointer-events-none absolute inset-4 rounded-[1.5rem] border border-white/10" />
                    <HeroCanvas scrollProgress={heroProgress} />
                    <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-cyan-200/25 bg-[#0b1230]/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/80">
                        Cyber coding core
                    </div>
                </div>
            </div>
        </section>
    );
}
