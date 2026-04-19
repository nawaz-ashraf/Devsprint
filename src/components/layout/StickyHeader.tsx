"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CodeXml, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { MagneticButton } from "@/components/effects/MagneticButton";
import { RippleButton } from "@/components/effects/RippleButton";
import { trackEvent } from "@/lib/analytics/track";
import { scrollToId } from "@/lib/animations/scroll";
import { cn } from "@/lib/utils/cn";

const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
] as const;

export function StickyHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setHasScrolled(window.scrollY > 16);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const onNavigate = (id: string, label: string) => {
        trackEvent("nav_link_clicked", { id, label });
        scrollToId(id);
        setMobileOpen(false);
    };

    const onStartProject = () => {
        trackEvent("header_start_project_clicked", { section: "header" });
        scrollToId("contact");
        setMobileOpen(false);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
            <div
                className={cn(
                    "mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition md:px-6",
                    hasScrolled
                        ? "border-white/18 bg-[#060a1d]/80 shadow-[0_18px_46px_rgba(3,8,24,0.55)] backdrop-blur-xl"
                        : "border-white/10 bg-[#070a1f]/58 backdrop-blur-lg"
                )}
            >
                <button
                    type="button"
                    onClick={() => onNavigate("hero", "Home")}
                    className="group inline-flex items-center gap-2 rounded-xl border border-transparent px-2 py-1 text-left transition hover:border-cyan-300/35 hover:bg-white/5"
                >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-200/35 bg-cyan-300/12 text-cyan-100">
                        <CodeXml className="h-4 w-4" />
                    </span>
                    <span>
                        <span className="block text-sm font-semibold tracking-wide text-white">Nawaz Studio</span>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-cyan-200/70">
                            Coding-first builds
                        </span>
                    </span>
                </button>

                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => onNavigate(item.id, item.label)}
                            className="rounded-xl px-4 py-2 text-sm text-[#c4d2f0] transition hover:bg-white/8 hover:text-cyan-100"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="hidden md:block">
                    <MagneticButton>
                        <RippleButton
                            type="button"
                            onClick={onStartProject}
                            className="glow-border bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950"
                        >
                            <span className="inline-flex items-center gap-2">
                                Start Project
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </RippleButton>
                    </MagneticButton>
                </div>

                <button
                    type="button"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-cyan-100 md:hidden"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-navigation"
                    aria-label="Toggle navigation menu"
                >
                    {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.24 }}
                        className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-white/14 bg-[#070b1f]/94 p-3 shadow-[0_22px_56px_rgba(2,6,18,0.65)] backdrop-blur-xl md:hidden"
                    >
                        <div className="space-y-1">
                            {navLinks.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onNavigate(item.id, item.label)}
                                    className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[#d3def8] transition hover:bg-white/8 hover:text-cyan-100"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <RippleButton
                            type="button"
                            onClick={onStartProject}
                            className="glow-border mt-3 w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950"
                        >
                            <span className="inline-flex items-center gap-2">
                                Start Project
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </RippleButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
