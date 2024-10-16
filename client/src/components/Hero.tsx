import React from "react";
import { motion } from "framer-motion";
import { animations } from "../shared/animation";

const Hero: React.FC = () => {
  const containerVariants = animations.containerVariants;
  const childVariants = animations.childVariants;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative h-screen w-full flex items-center justify-center font-Flux overflow-y-hidden"
    >
      <motion.img
        src="https://ik.imagekit.io/0y99xuz0yp/PXL_20240716_190032958.jpg?updatedAt=1729068720070"
        alt="background image of me"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <motion.div className="absolute inset-0 bg-black opacity-75" />

      <motion.div
        variants={containerVariants}
        className="w-[96%] flex flex-row justify-center md:justify-between items-center text-white font-bold cursor-pointer"
      >
        <motion.h2 className="hidden md:block" variants={childVariants}>
          Creative
        </motion.h2>
        <motion.h1 variants={childVariants} className="text-6xl">
          Dhaniel.
        </motion.h1>
        <motion.h2 className="hidden md:block" variants={childVariants}>
          Engineer
        </motion.h2>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
