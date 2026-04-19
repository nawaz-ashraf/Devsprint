"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";

const testimonials = [
    {
        quote:
            "The build quality was exceptional — polished UI, clean architecture, and very fast communication throughout.",
        name: "Product Founder",
        role: "B2C Mobile Startup",
    },
    {
        quote:
            "From concept to delivery, everything felt structured and professional. The final app was both premium and practical.",
        name: "Operations Lead",
        role: "Service Business",
    },
    {
        quote:
            "Strong product thinking, not just coding. Every recommendation improved usability and conversion clarity.",
        name: "Marketing Director",
        role: "Digital Agency Partner",
    },
];

const trustStats = [
    { value: "25+", label: "Apps Built" },
    { value: "40+", label: "Websites Created" },
    { value: "95+", label: "Performance-Focused Audits" },
    { value: "98%", label: "Client Satisfaction" },
];

export function TestimonialsSection() {
    return (
        <section data-story-section className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30">
            <div className="mx-auto w-full max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="mb-10 space-y-4"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-xs uppercase tracking-[0.24em] text-cyan-200/80"
                        data-reveal
                    >
                        Social Proof
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        Trusted to ship high-end digital products.
                    </motion.h2>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={sectionStagger}
                    className="grid gap-6 lg:grid-cols-3"
                >
                    {testimonials.map((item) => (
                        <motion.article
                            key={`${item.name}-${item.role}`}
                            variants={fadeUpVariants}
                            data-reveal
                            className="glass-panel rounded-3xl border border-white/12 p-6"
                        >
                            <div className="mb-4 flex gap-1 text-cyan-200">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="mb-6 text-sm leading-relaxed text-[#d0dbf7]">“{item.quote}”</p>
                            <p className="text-sm font-semibold text-white">{item.name}</p>
                            <p className="text-xs uppercase tracking-[0.16em] text-[#90a3cc]">{item.role}</p>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {trustStats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUpVariants}
                            data-reveal
                            className="glass-panel rounded-2xl border border-white/12 px-4 py-5 text-center"
                        >
                            <p className="text-2xl font-semibold text-cyan-100">{stat.value}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#94a7d1]">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
