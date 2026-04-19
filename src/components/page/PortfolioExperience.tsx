"use client";

import { useEffect, useRef } from "react";

import { CursorGlow } from "@/components/effects/CursorGlow";
import { MouseFollowLight } from "@/components/effects/MouseFollowLight";
import { HeroSection } from "@/components/hero/HeroSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { createStorytellingAnimations } from "@/lib/animations/scroll";

export function PortfolioExperience() {
    const rootRef = useRef<HTMLElement | null>(null);
    const reducedMotion = useReducedMotionSafe();

    useEffect(() => {
        if (!rootRef.current) return;

        const cleanup = createStorytellingAnimations(rootRef.current, reducedMotion);

        return cleanup;
    }, [reducedMotion]);

    return (
        <SmoothScrollProvider>
            <div className="relative isolate overflow-x-clip">
                <MouseFollowLight />
                <CursorGlow />
                <StickyHeader />

                <main ref={rootRef} className="relative z-10 pt-20 md:pt-24">
                    <HeroSection />
                    <ProjectsSection />
                    <ServicesSection />
                    <AboutSection />
                    <WhyChooseSection />
                    <TestimonialsSection />
                    <ContactSection />
                </main>

                <SiteFooter />
            </div>
        </SmoothScrollProvider>
    );
}
