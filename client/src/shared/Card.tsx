import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { animations } from "./animation";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  description?: string;
  icon?: JSX.Element;
  link?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, link }) => {
  const childReveal = useScrollAnimation(animations.scaleRevealChildren);
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      {...childReveal}
      className="rounded-lg bg-white shadow-md p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 font-SF"
    >
      <div className="flex flex-col justify-center items-start w-full">
        {icon && <div className="mb-4">{icon}</div>}
        <h3 className="text-md md:text-xl font-bold mb-4">{title}</h3>

        {description && (
          <p className="text-gray-600 text-xs md:text-[16px] font-light mb-4 font-Flux">
            {description}
          </p>
        )}
        {link && (
          <Link
            to={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-xs"
          >
            Check {title}
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
