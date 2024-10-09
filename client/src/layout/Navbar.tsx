import { motion, useScroll, useTransform } from "framer-motion";
import logo from "../assets/images/logo-white.png";
import { Link } from "react-router-dom";
import { animations } from "../shared/animation";
import { useEffect, useRef } from "react";
import useSize from "../hooks/useSize";

const Navbar: React.FC = () => {
  const dimension = useSize();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", `${dimension.height}px`],
  });

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    ["#FFFFFF", "#FFFFFF", "#000000"]
  );

  const containerVariants = animations.containerVariants;
  const childVariants = animations.childVariants;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 font-SF flex justify-center items-center py-6 px-6 sm:px-8 lg:px-12 bg-transparent bg-opacity-70 backdrop-blur-md shadow-lg"
    >
      <motion.div className="w-[96%] flex flex-row justify-between">
        <motion.img
          variants={childVariants}
          src={logo}
          className="object-contain w-12 -ml-12"
        />
        <motion.ul
          variants={containerVariants}
          className="w-[25%] flex flex-row justify-between"
          style={{ color: textColor }}
        >
          {["Me", "Projects", "Products", "Blog"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={childVariants}
            >
              <Link to="/">{item}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
