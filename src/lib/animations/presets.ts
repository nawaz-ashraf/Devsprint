import type { Transition, Variants } from "framer-motion";

export const smoothTransition: Transition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
};

export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: smoothTransition,
    },
};

export const sectionStagger: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};
