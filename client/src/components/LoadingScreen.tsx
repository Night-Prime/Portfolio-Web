import { useEffect, useState, type FC } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [showVal, setShowVal] = useState(true);
  const showChar = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 10,
        stiffness: 100,
        delay: 0.1,
      },
    },
  };

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 99, {
      duration: 1,
      onComplete: () => {
        setShowVal(false);
        setTimeout(() => {
          onLoadComplete();
        }, 1000);
      },
    });
    return () => animation.stop();
  }, []);

  return (
    <motion.div id="preloader" className="loader w-screen h-screen">
      <motion.h1 className="w-full h-full flex flex-row justify-center items-center text-8xl">
        {showVal ? (
          <>
            <motion.h1>{rounded}</motion.h1>%
          </>
        ) : (
          <>
            <motion.span variants={showChar} initial="hidden" animate="visible">
              岸
            </motion.span>
            <motion.span variants={showChar} initial="hidden" animate="visible">
              快
            </motion.span>
            <motion.span variants={showChar} initial="hidden" animate="visible">
              平
            </motion.span>
          </>
        )}
      </motion.h1>
    </motion.div>
  );
};

export default LoadingScreen;
