import React from "react";
import { useInView, Variants } from "framer-motion";

const useScrollAnimation = (animation: Variants) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    return { ref, animate: isInView ? "visible" : "hidden", variants: animation }
}

export default useScrollAnimation