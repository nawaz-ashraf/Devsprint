import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let pluginsRegistered = false;

function ensurePluginsRegistered() {
    if (pluginsRegistered) return;
    gsap.registerPlugin(ScrollTrigger);
    pluginsRegistered = true;
}

interface SmoothScrollOptions {
    enabled?: boolean;
}

export function setupSmoothScroll(options: SmoothScrollOptions = {}) {
    ensurePluginsRegistered();

    const { enabled = true } = options;

    if (!enabled || typeof window === "undefined") {
        return () => undefined;
    }

    const lenis = new Lenis({
        duration: 1.08,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
    });

    let rafId = 0;

    const onScroll = () => {
        ScrollTrigger.update();
    };

    const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
    };

    const onResize = () => {
        ScrollTrigger.refresh();
    };

    lenis.on("scroll", onScroll);
    rafId = requestAnimationFrame(raf);
    window.addEventListener("resize", onResize);

    return () => {
        window.removeEventListener("resize", onResize);
        lenis.off("scroll", onScroll);
        cancelAnimationFrame(rafId);
        lenis.destroy();
    };
}

export function createStorytellingAnimations(
    scope: HTMLElement,
    reducedMotion = false
) {
    ensurePluginsRegistered();

    const context = gsap.context(() => {
        const revealElements = gsap.utils.toArray<HTMLElement>("[data-reveal]");

        revealElements.forEach((element, index) => {
            gsap.fromTo(
                element,
                {
                    autoAlpha: reducedMotion ? 1 : 0,
                    y: reducedMotion ? 0 : 46,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: reducedMotion ? 0.2 : 1,
                    ease: "power3.out",
                    delay: reducedMotion ? 0 : index * 0.03,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 84%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        if (!reducedMotion) {
            const parallaxElements = gsap.utils.toArray<HTMLElement>("[data-parallax]");

            parallaxElements.forEach((element) => {
                const mode = element.dataset.parallax;
                const shift =
                    mode === "foreground" ? -16 : mode === "background" ? 20 : 11;

                const triggerElement =
                    element.closest<HTMLElement>("[data-story-section]") ?? element;

                gsap.to(element, {
                    yPercent: shift,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            });
        }

        const sections = gsap.utils.toArray<HTMLElement>("[data-story-section]");

        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { autoAlpha: reducedMotion ? 1 : 0.72 },
                {
                    autoAlpha: 1,
                    duration: reducedMotion ? 0.2 : 1.2,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 92%",
                        end: "top 30%",
                        scrub: reducedMotion ? false : 0.45,
                    },
                }
            );
        });
    }, scope);

    return () => context.revert();
}

export function scrollToId(id: string) {
    if (typeof window === "undefined") return;

    const target = document.getElementById(id);

    if (target) {
        const headerOffset = 88;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        window.scrollTo({
            top: targetTop,
            behavior: "smooth",
        });
    }
}
