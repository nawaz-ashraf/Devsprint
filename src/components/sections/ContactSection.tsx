"use client";

import { motion } from "framer-motion";
import { Code2, Handshake, Mail, MessageCircle, SendHorizonal } from "lucide-react";
import { useState } from "react";

import { MagneticButton } from "@/components/effects/MagneticButton";
import { RippleButton } from "@/components/effects/RippleButton";
import { trackEvent } from "@/lib/analytics/track";
import { fadeUpVariants, sectionStagger } from "@/lib/animations/presets";
import { cn } from "@/lib/utils/cn";

interface ContactFormState {
    name: string;
    email: string;
    company: string;
    projectType: string;
    budget: string;
    message: string;
}

const initialForm: ContactFormState = {
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
};

type FormErrors = Partial<Record<keyof ContactFormState, string>>;

const quickLinks = [
    {
        label: "Email me",
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

function validateForm(values: ContactFormState): FormErrors {
    const nextErrors: FormErrors = {};

    if (values.name.trim().length < 2) {
        nextErrors.name = "Please enter your name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
        nextErrors.email = "Please provide a valid email address.";
    }

    if (values.company.trim().length > 120) {
        nextErrors.company = "Company/brand name must be under 120 characters.";
    }

    if (!values.projectType.trim()) {
        nextErrors.projectType = "Please choose a project type.";
    }

    if (!values.budget.trim()) {
        nextErrors.budget = "Please choose a budget range.";
    }

    if (values.message.trim().length < 20) {
        nextErrors.message = "Please share at least a short project brief (20+ characters).";
    }

    return nextErrors;
}

export function ContactSection() {
    const [formData, setFormData] = useState<ContactFormState>(initialForm);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusType, setStatusType] = useState<"idle" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const onChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        const field = name as keyof ContactFormState;

        setFormData((prev) => ({ ...prev, [field]: value }));

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }

        if (statusType !== "idle") {
            setStatusType("idle");
            setStatusMessage("");
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;

        const nextErrors = validateForm(formData);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStatusType("error");
            setStatusMessage("Please fix the highlighted fields and try again.");
            return;
        }

        setIsSubmitting(true);
        setStatusType("idle");
        setStatusMessage("");

        trackEvent("contact_form_submit_started", {
            projectType: formData.projectType,
            budget: formData.budget,
        });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = (await response.json().catch(() => null)) as
                | { error?: string }
                | null;

            if (!response.ok) {
                throw new Error(
                    result?.error ??
                    "Could not send your request right now. Please try again shortly."
                );
            }

            setFormData(initialForm);
            setErrors({});
            setStatusType("success");
            setStatusMessage(
                "Thanks! Your project brief has been delivered. I’ll reply within 24 hours."
            );

            trackEvent("contact_form_submit_success", {
                projectType: formData.projectType,
                budget: formData.budget,
            });
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Unexpected error while sending your inquiry.";

            setStatusType("error");
            setStatusMessage(message);

            trackEvent("contact_form_submit_failed", {
                projectType: formData.projectType,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            data-story-section
            className="relative overflow-hidden px-6 py-24 md:px-10 md:py-30"
        >
            <div
                className="floating-orb pointer-events-none absolute left-[-110px] top-20 h-72 w-72 bg-blue-400/22"
                data-parallax="background"
            />

            <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionStagger}
                    className="space-y-5"
                >
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-xs uppercase tracking-[0.24em] text-cyan-200/80"
                        data-reveal
                    >
                        Contact / Project Brief
                    </motion.p>
                    <motion.h2
                        variants={fadeUpVariants}
                        className="text-3xl font-semibold text-white sm:text-4xl"
                        data-reveal
                    >
                        Let&apos;s turn your idea into a premium product.
                    </motion.h2>
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-base leading-relaxed text-[#aebce0] sm:text-lg"
                        data-reveal
                    >
                        Share your goals, budget, and timeline. Your brief is submitted to a secure
                        backend endpoint and delivered to my email for fast response.
                    </motion.p>
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-sm text-[#92a4cb]"
                        data-reveal
                    >
                        Typical response time: within 24 hours.
                    </motion.p>

                    <motion.div
                        variants={fadeUpVariants}
                        className="grid gap-2 sm:grid-cols-2"
                        data-reveal
                    >
                        {quickLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                    trackEvent("contact_quick_link_clicked", {
                                        label: link.label,
                                    });
                                }}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-sm text-[#d6e3ff] transition hover:border-cyan-300/40 hover:text-cyan-100"
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.16 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={onSubmit}
                    className="glass-panel rounded-3xl border border-white/12 p-6 sm:p-8"
                    data-reveal
                    noValidate
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-[#dbe5ff]">
                            <span>Name</span>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Your name"
                                className={cn(
                                    "w-full rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                    errors.name ? "border-rose-300/70" : "border-white/15"
                                )}
                            />
                            {errors.name && <p className="text-xs text-rose-300">{errors.name}</p>}
                        </label>

                        <label className="space-y-2 text-sm text-[#dbe5ff]">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="you@company.com"
                                className={cn(
                                    "w-full rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                    errors.email ? "border-rose-300/70" : "border-white/15"
                                )}
                            />
                            {errors.email && <p className="text-xs text-rose-300">{errors.email}</p>}
                        </label>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-[#dbe5ff]">
                            <span>Company / Brand (optional)</span>
                            <input
                                name="company"
                                value={formData.company}
                                onChange={onChange}
                                placeholder="Your company name"
                                className={cn(
                                    "w-full rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                    errors.company ? "border-rose-300/70" : "border-white/15"
                                )}
                            />
                            {errors.company && <p className="text-xs text-rose-300">{errors.company}</p>}
                        </label>

                        <label className="space-y-2 text-sm text-[#dbe5ff]">
                            <span>Project Type</span>
                            <select
                                name="projectType"
                                value={formData.projectType}
                                onChange={onChange}
                                className={cn(
                                    "w-full rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                    errors.projectType ? "border-rose-300/70" : "border-white/15"
                                )}
                            >
                                <option value="" disabled>
                                    Select project type
                                </option>
                                <option value="flutter-app-development">Flutter App Development</option>
                                <option value="website-development">Website Development</option>
                                <option value="ui-ux-design">UI/UX Design</option>
                                <option value="landing-page">Landing Page</option>
                                <option value="dashboard-development">Dashboard Development</option>
                                <option value="maintenance-optimization">Maintenance / Optimization</option>
                            </select>
                            {errors.projectType && (
                                <p className="text-xs text-rose-300">{errors.projectType}</p>
                            )}
                        </label>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm text-[#dbe5ff]">
                            <span>Budget Range</span>
                            <select
                                name="budget"
                                value={formData.budget}
                                onChange={onChange}
                                className={cn(
                                    "w-full rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                    errors.budget ? "border-rose-300/70" : "border-white/15"
                                )}
                            >
                                <option value="" disabled>
                                    Select budget range
                                </option>
                                <option value="2k-5k">$2k - $5k</option>
                                <option value="5k-10k">$5k - $10k</option>
                                <option value="10k-20k">$10k - $20k</option>
                                <option value="20k+">$20k+</option>
                            </select>
                            {errors.budget && <p className="text-xs text-rose-300">{errors.budget}</p>}
                        </label>
                    </div>

                    <label className="mt-4 block space-y-2 text-sm text-[#dbe5ff]">
                        <span>Message / Project Brief</span>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={onChange}
                            rows={5}
                            placeholder="Tell me about your goals, timeline, target users, and what success looks like."
                            className={cn(
                                "w-full resize-none rounded-2xl border bg-[#0d1331]/65 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.15)]",
                                errors.message ? "border-rose-300/70" : "border-white/15"
                            )}
                        />
                        {errors.message && <p className="text-xs text-rose-300">{errors.message}</p>}
                    </label>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <MagneticButton>
                            <RippleButton
                                disabled={isSubmitting}
                                type="submit"
                                className="glow-border bg-gradient-to-r from-violet-500 to-cyan-400 text-slate-950 shadow-[0_0_34px_rgba(139,92,246,0.32)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                <span className="inline-flex items-center gap-2">
                                    {isSubmitting ? "Sending..." : "Send Project Brief"}
                                    <SendHorizonal className="h-4 w-4" />
                                </span>
                            </RippleButton>
                        </MagneticButton>

                        <p className="text-xs text-[#92a4cb]">No spam. Just useful responses.</p>
                    </div>

                    <p
                        className={cn(
                            "mt-4 min-h-5 text-sm",
                            statusType === "error" ? "text-rose-300" : "text-cyan-200"
                        )}
                        role="status"
                        aria-live="polite"
                    >
                        {statusMessage}
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
