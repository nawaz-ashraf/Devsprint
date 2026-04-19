"use client";

import { Code2, Handshake, Mail, MessageCircle } from "lucide-react";

import { trackEvent } from "@/lib/analytics/track";
import { scrollToId } from "@/lib/animations/scroll";

const quickLinks = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
] as const;

const contactLinks = [
    {
        label: "Email",
        href: "mailto:hello@nawazstudio.dev",
        icon: Mail,
    },
    {
        label: "WhatsApp",
        href: "https://wa.me/923000000000",
        icon: MessageCircle,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nawaz",
        icon: Handshake,
    },
    {
        label: "GitHub",
        href: "https://github.com/nawazashraf",
        icon: Code2,
    },
] as const;

export function SiteFooter() {
    return (
        <footer className="px-6 pb-10 pt-16 md:px-10">
            <div className="mx-auto w-full max-w-7xl rounded-3xl border border-white/12 bg-[#070b1f]/72 p-6 shadow-[0_24px_70px_rgba(2,6,20,0.5)] backdrop-blur-xl md:p-8">
                <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.9fr]">
                    <div>
                        <p className="text-lg font-semibold text-white">Nawaz Studio</p>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#9fb0d6]">
                            I build modern apps and websites that solve real problems with
                            conversion-focused UX and production-grade engineering.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Quick Links</p>
                        <div className="mt-3 space-y-2">
                            {quickLinks.map((link) => (
                                <button
                                    key={link.id}
                                    type="button"
                                    onClick={() => {
                                        trackEvent("footer_link_clicked", {
                                            type: "quick-link",
                                            id: link.id,
                                        });
                                        scrollToId(link.id);
                                    }}
                                    className="block text-sm text-[#c4d3f1] transition hover:text-cyan-100"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/75">Contact</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-2">
                            {contactLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        trackEvent("footer_link_clicked", {
                                            type: "contact-link",
                                            label: link.label,
                                        });
                                    }}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-xs text-[#d8e4ff] transition hover:border-cyan-300/40 hover:text-cyan-100"
                                >
                                    <link.icon className="h-3.5 w-3.5" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/12 pt-4 text-xs uppercase tracking-[0.18em] text-[#8b9dc8]">
                    © {new Date().getFullYear()} Nawaz Studio — Crafted for premium product experiences.
                </div>
            </div>
        </footer>
    );
}
