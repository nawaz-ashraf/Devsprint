"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers, PlayCircle, Store } from "lucide-react";
import { useMemo, useState } from "react";

import { projects } from "@/data/projects";
import { useIsMobile } from "@/hooks/useIsMobile";
import { trackEvent } from "@/lib/analytics/track";
import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";
import type { ProjectCategory, ProjectItem } from "@/types/content";

type FilterType = "All" | ProjectCategory;

const filters: FilterType[] = ["All", "Flutter Apps", "Websites", "Tools"];

interface ProjectCardProps {
    project: ProjectItem;
    index: number;
    isMobile: boolean;
    onAction: (project: ProjectItem, action: "details" | "playstore" | "demo") => void;
}

function ProjectCard({ project, index, isMobile, onAction }: ProjectCardProps) {
    const [transform, setTransform] = useState(
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    );

    const onMove = (event: React.MouseEvent<HTMLElement>) => {
        if (isMobile) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - y) * 10;
        const rotateY = (x - 0.5) * 10;

        setTransform(
            `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`
        );
    };

    const onLeave = () => {
        setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)");
    };

    const onActionClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        action: "details" | "playstore" | "demo",
        href: string | undefined
    ) => {
        if (!href || href === "#") {
            event.preventDefault();
        }

        onAction(project, action);
    };

    return (
        <motion.article
            layout
            data-reveal
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={isMobile ? undefined : { transform }}
            className="glass-panel glow-border relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay: index * 0.03 }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(79,116,255,0.22),transparent_42%),radial-gradient(circle_at_80%_100%,rgba(139,92,246,0.20),transparent_45%)]" />

            <div className="relative z-10">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-cyan-200/75">
                            {project.category}
                        </p>
                        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    </div>

                    <div className="rounded-full border border-white/15 p-2 text-cyan-200">
                        <ArrowUpRight className="h-4 w-4" />
                    </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-[#9fb0d6]">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {project.badges.map((badge) => (
                        <span
                            key={badge}
                            className="rounded-full border border-cyan-300/28 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-cyan-100"
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                <div className="mb-5 grid gap-2">
                    {project.keyFeatures.map((feature) => (
                        <p key={feature} className="flex items-start gap-2 text-xs text-[#d6e1fb]">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{feature}</span>
                        </p>
                    ))}
                </div>

                <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-[#0a112f]/74 px-3 py-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#95a9d1]">Tech Stack</p>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                        {project.stack.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs text-[#d7e2ff]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="text-sm text-[#b4c2e8]">{project.outcome}</p>

                {project.featured && (
                    <div className="mt-6 rounded-2xl border border-cyan-300/25 bg-[#070b1f]/70 p-3">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                            <Layers className="h-3.5 w-3.5" />
                            Flutter app preview layer
                        </div>
                        <div className="relative mt-3 h-24 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/25 via-violet-500/20 to-cyan-400/25">
                            <div className="absolute inset-4 animate-gentle-float rounded-lg border border-cyan-100/30 bg-[#0b1233]/85" />
                        </div>
                    </div>
                )}

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                    <a
                        href={project.links.details}
                        onClick={(event) => onActionClick(event, "details", project.links.details)}
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-[#d7e4ff] transition hover:border-cyan-300/40 hover:text-cyan-100"
                    >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        View Details
                    </a>

                    <a
                        href={project.links.playStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => onActionClick(event, "playstore", project.links.playStore)}
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100 transition hover:border-cyan-300/55"
                    >
                        <Store className="h-3.5 w-3.5" />
                        Play Store
                    </a>

                    <a
                        href={project.links.demo ?? "#"}
                        target={project.links.demo ? "_blank" : undefined}
                        rel={project.links.demo ? "noopener noreferrer" : undefined}
                        onClick={(event) => onActionClick(event, "demo", project.links.demo)}
                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-[#d7e4ff] transition hover:border-cyan-300/40 hover:text-cyan-100"
                    >
                        <PlayCircle className="h-3.5 w-3.5" />
                        Demo / Preview
                    </a>
                </div>
            </div>
        </motion.article>
    );
}

export function ProjectsSection() {
    const isMobile = useIsMobile();
    const [activeFilter, setActiveFilter] = useState<FilterType>("All");

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
        trackEvent("projects_filter_changed", { filter });
    };

    const handleProjectAction = (
        project: ProjectItem,
        action: "details" | "playstore" | "demo"
    ) => {
        trackEvent("project_card_cta_clicked", {
            name: project.name,
            category: project.category,
            action,
        });
    };

    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter((project) => project.category === activeFilter);
    }, [activeFilter]);

    return (
        <section
            id="projects"
            data-story-section
            className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30"
        >
            <div
                className="floating-orb pointer-events-none absolute -left-20 top-10 h-64 w-64 bg-violet-400/20"
                data-parallax="background"
            />

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
                        Project Showcase
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        Flutter apps designed as real Play Store products.
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariants}
                        className="max-w-3xl text-base text-[#a7b5da] sm:text-lg"
                        data-reveal
                    >
                        A premium mobile app portfolio focused on utility, retention, and polished
                        user experience — built with Flutter and prepared for Play Store release.
                    </motion.p>
                </motion.div>

                <div className="mb-8 flex flex-wrap gap-3" data-reveal>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => handleFilterChange(filter)}
                            className={cn(
                                "rounded-full border px-4 py-2 text-sm font-medium transition",
                                activeFilter === filter
                                    ? "border-cyan-300/60 bg-cyan-300/20 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.28)]"
                                    : "border-white/15 bg-white/5 text-[#c3d1f0] hover:border-cyan-200/40 hover:text-cyan-100"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel rounded-3xl border border-white/12 p-8 text-center"
                    >
                        <p className="text-lg font-medium text-white">More categories coming soon.</p>
                        <p className="mt-2 text-sm text-[#9eb0d7]">
                            Current portfolio spotlight is focused on Flutter and Play Store-ready
                            mobile app products.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        layout
                        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.05 }}
                        variants={sectionStagger}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.name}
                                    project={project}
                                    index={index}
                                    isMobile={isMobile}
                                    onAction={handleProjectAction}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
