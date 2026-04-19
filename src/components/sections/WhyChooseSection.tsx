"use client";

import { motion } from "framer-motion";
import {
    Handshake,
    HeartHandshake,
    MessageCircleCode,
    Palette,
    Rocket,
    ScanSearch,
    type LucideIcon,
} from "lucide-react";

import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";

const reasons: Array<{ title: string; description: string; icon: LucideIcon }> = [
    {
        title: "Fast communication",
        description: "Clear updates, fast replies, and transparent milestones through the full build cycle.",
        icon: MessageCircleCode,
    },
    {
        title: "Clean code",
        description: "Readable, maintainable architecture with long-term scalability in mind.",
        icon: ScanSearch,
    },
    {
        title: "Modern design",
        description: "Premium, conversion-focused interfaces with product-level visual polish.",
        icon: Palette,
    },
    {
        title: "Real product thinking",
        description: "Feature choices guided by user behavior, retention, and measurable outcomes.",
        icon: Rocket,
    },
    {
        title: "Client-focused delivery",
        description: "Built around your goals, constraints, audience, and launch timeline.",
        icon: Handshake,
    },
    {
        title: "Support after launch",
        description: "Post-release fixes, optimization passes, and structured iteration support.",
        icon: HeartHandshake,
    },
];

export function WhyChooseSection() {
    return (
        <section data-story-section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30">
            <div
                className="floating-orb pointer-events-none absolute right-[-90px] top-12 h-72 w-72 bg-violet-400/16"
                data-parallax="background"
            />

            <div className="mx-auto w-full max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="mb-12 space-y-4"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-xs uppercase tracking-[0.24em] text-cyan-200/80"
                        data-reveal
                    >
                        Why Work With Me
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        A reliable technical partner, not just a task executor.
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariants}
                        className="max-w-3xl text-base text-[#a7b5da] sm:text-lg"
                        data-reveal
                    >
                        I combine engineering precision, modern product design, and ownership mindset
                        to deliver work that performs in real-world usage.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionStagger}
                    className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {reasons.map((reason) => (
                        <motion.article
                            key={reason.title}
                            variants={fadeUpVariants}
                            whileHover={{ y: -5 }}
                            data-reveal
                            className="group glass-panel rounded-3xl border border-white/12 p-6"
                        >
                            <span className="mb-4 inline-flex rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-100 transition group-hover:scale-105">
                                <reason.icon className="h-4 w-4" />
                            </span>
                            <h3 className="mb-2 text-lg font-semibold text-white">{reason.title}</h3>
                            <p className="text-sm leading-relaxed text-[#9fb0d6]">{reason.description}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
