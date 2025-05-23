export const animations = {
    containerVariants: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.5,
            },
        },
        exit: {
            opacity: 0,
            x: "100%",
            transition: { type: "spring", stiffness: 50, damping: 12 },
        },
    },
    childVariants: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    },
    boxReveal: {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1.25, staggerChildren: 0.5 },
        },
    },
    reveal: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: .5,
                staggerChildren: 0.5,
            },
        },
    },
    revealChildren: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 2 },
        },
    },
    scaleReveal: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1, delayChildren: 0.5, staggerChildren: 0.5 },

        },
    },
    scaleRevealChildren: {
        hidden: { opacity: 0, scale: 0.8, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5 },
        },
    },
} as const;