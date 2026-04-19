"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Layers3, Palette } from "lucide-react";

import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";

const skills = [
    "Flutter",
    "Dart",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Firebase",
    "Supabase",
    "Framer Motion",
];

const pillars = [
    {
        icon: Code2,
        title: "Problem-solving engineering",
        text: "I architect and ship modern apps and websites that solve real business and user pain points.",
    },
    {
        icon: Layers3,
        title: "Product-first execution",
        text: "I think in product systems, not pages — from onboarding flow to retention loops and conversion touchpoints.",
    },
    {
        icon: Palette,
        title: "Clean UI/UX craft",
        text: "I combine sharp visuals with practical UX so interfaces feel premium without sacrificing usability.",
    },
    {
        icon: BrainCircuit,
        title: "Real-world delivery",
        text: "Every build is optimized for production: maintainable code, performance, and clear post-launch growth room.",
    },
];

export function AboutSection() {
    return (
        <section
            id="about"
            data-story-section
            className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30"
        >
            <div
                className="floating-orb pointer-events-none absolute left-[-90px] top-8 h-64 w-64 bg-cyan-400/16"
                data-parallax="background"
            />

            <div className="mx-auto w-full max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
                >
                    <div className="space-y-5">
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-xs uppercase tracking-[0.24em] text-cyan-200/80"
                            data-reveal
                        >
                            About
                        </motion.p>
                        <motion.h2
                            variants={fadeUpVariants}
                            className="text-3xl font-semibold text-white sm:text-4xl"
                            data-reveal
                        >
                            Senior developer focused on real product outcomes.
                        </motion.h2>
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-base leading-relaxed text-[#afbee0] sm:text-lg"
                            data-reveal
                        >
                            I build modern Flutter apps and web platforms that are useful, fast,
                            and production-ready. My approach blends technical depth with product
                            thinking — so the final result is not just visually impressive, but
                            genuinely effective for users and business goals.
                        </motion.p>
                        <motion.p
                            variants={fadeUpVariants}
                            className="text-base leading-relaxed text-[#97a8ce]"
                            data-reveal
                        >
                            Mission: ship clean, scalable experiences that solve real-world
                            problems with strong UX, robust code, and measurable impact.
                        </motion.p>
                    </div>

                    <motion.div
                        variants={fadeUpVariants}
                        className="glass-panel rounded-3xl border border-white/12 p-6"
                        data-reveal
                    >
                        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-cyan-200/75">
                            Skill highlights
                        </p>
                        <div className="mb-7 flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-[#d9e3ff]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {pillars.map((pillar) => (
                                <article
                                    key={pillar.title}
                                    className="rounded-2xl border border-white/10 bg-[#090f2a]/72 p-4"
                                >
                                    <span className="mb-3 inline-flex rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-100">
                                        <pillar.icon className="h-4 w-4" />
                                    </span>
                                    <h3 className="mb-2 text-sm font-semibold text-white">{pillar.title}</h3>
                                    <p className="text-xs leading-relaxed text-[#9fb0d6]">{pillar.text}</p>
                                </article>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
