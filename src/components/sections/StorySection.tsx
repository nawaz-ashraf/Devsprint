"use client";

import { motion } from "framer-motion";

import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";

const storyBlocks = [
    {
        title: "Vision-led product storytelling",
        description:
            "Every section is built as a narrative checkpoint that nudges users from curiosity to confidence.",
    },
    {
        title: "Depth-first interaction design",
        description:
            "Layered motion, subtle parallax, and meaningful feedback create an interface that feels alive — never noisy.",
    },
    {
        title: "Conversion by design",
        description:
            "Clear hierarchy, strategic CTAs, and trust cues ensure the visual wow also performs in real business outcomes.",
    },
];

export function StorySection() {
    return (
        <section
            id="story"
            data-story-section
            className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30"
        >
            <div
                className="floating-orb pointer-events-none absolute right-[-80px] top-10 h-60 w-60 bg-blue-400/20"
                data-parallax="background"
            />

            <div className="mx-auto w-full max-w-6xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="mb-14 max-w-3xl space-y-4"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-xs uppercase tracking-[0.26em] text-cyan-200/80"
                        data-reveal
                    >
                        Scroll-based storytelling
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        Cinematic transitions, anchored in clarity.
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-base text-[#aab9dd] sm:text-lg"
                        data-reveal
                    >
                        The experience unfolds like a product demo: each scroll reveals intent,
                        builds trust, and keeps users moving toward action.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={sectionStagger}
                    className="grid gap-6 md:grid-cols-3"
                >
                    {storyBlocks.map((block) => (
                        <motion.article
                            key={block.title}
                            variants={fadeUpVariants}
                            data-reveal
                            className="glass-panel rounded-3xl p-6"
                        >
                            <div className="mb-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-300/80 to-violet-300/75" />
                            <h3 className="mb-3 text-xl font-medium text-white">{block.title}</h3>
                            <p className="text-sm leading-relaxed text-[#9dadd0]">{block.description}</p>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
