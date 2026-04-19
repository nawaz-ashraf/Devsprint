"use client";

import { motion } from "framer-motion";
import {
    Bug,
    Code2,
    LayoutDashboard,
    PenTool,
    Rocket,
    ShieldCheck,
    Smartphone,
    type LucideIcon,
} from "lucide-react";

import { services } from "@/data/services";
import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";

const iconMap: Record<string, LucideIcon> = {
    code: Code2,
    phone: Smartphone,
    pen: PenTool,
    rocket: Rocket,
    dashboard: LayoutDashboard,
    wrench: Bug,
    shield: ShieldCheck,
};

export function ServicesSection() {
    return (
        <section
            id="services"
            data-story-section
            className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30"
        >
            <div
                className="floating-orb pointer-events-none absolute right-[-90px] top-12 h-72 w-72 bg-cyan-400/18"
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
                        Services
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        Productized services built to launch, scale, and support.
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariants}
                        className="max-w-3xl text-base text-[#a7b5da] sm:text-lg"
                        data-reveal
                    >
                        End-to-end development offers for Flutter apps and modern web products —
                        from first release to long-term maintenance.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={sectionStagger}
                    className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon];

                        return (
                            <motion.article
                                key={service.name}
                                variants={fadeUpVariants}
                                whileHover={{ y: -6 }}
                                data-reveal
                                className="group glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-6"
                            >
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.18),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(139,92,246,0.18),transparent_44%)] opacity-0 transition duration-300 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ rotate: 8, scale: 1.06 }}
                                        transition={{ type: "spring", stiffness: 240, damping: 16 }}
                                        className="mb-5 inline-flex rounded-xl border border-cyan-200/30 bg-cyan-300/10 p-3 text-cyan-100"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </motion.div>

                                    <h3 className="mb-3 text-xl font-semibold text-white">{service.name}</h3>
                                    <p className="mb-5 text-sm leading-relaxed text-[#9faed4]">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-2">
                                        {service.highlights.map((highlight) => (
                                            <li key={highlight} className="flex items-center gap-2 text-sm text-[#d2dcf8]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
