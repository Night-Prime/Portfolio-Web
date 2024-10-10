import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { animations } from "../shared/animation";
import me from "../assets/images/Dhaniel-5-2023-1.jpg";

type skillProps = {
  skill: string;
};

const skills = [
  "Problem Solving",
  "Ideation & Execution",
  "Backend Development",
  "Coding",
  "Photography",
  "Writing",
  "Visual Arts",
  "Learning",
  "Frontend Development",
];

const Skillscard: React.FC<skillProps> = ({ skill }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer bg-gray-200 text-red-600 h-16 w-1/4 m-2 rounded-full y-2 px-4 flex items-center justify-center font-bold font-Flux text-[16px]"
    >
      {skill}
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const childReveal = useScrollAnimation(animations.scaleRevealChildren);
  return (
    <motion.div
      {...childReveal}
      className="h-screen w-full flex justify-center items-center font-SF"
    >
      <motion.div
        {...childReveal}
        className="h-[80%] w-[90%] flex flex-row-reverse justify-between items-center"
      >
        <motion.div
          {...childReveal}
          className="h-full w-1/4 flex flex-col justify-between gap-6 items-end"
        >
          <motion.img
            src={me}
            alt={me}
            className="object-cover h-[80%] w-full rounded-2xl"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer bg-red-600 text-gray-200 h-24 w-full rounded-full y-2 px-4 flex items-center justify-center font-bold font-SF text-2xl"
          >
            Dhaniel's Gallery
          </motion.div>
        </motion.div>

        <motion.div className="w-3/4 h-full flex flex-col justify-evenly items-start font-SF">
          {/* <motion.h1 className="w-full text-start text-red-600 text-xl font-semibold">
            Dhaniel's skills
          </motion.h1> */}
          <motion.h1 className="w-3/4 text-start text-3xl font-semibold font-Flux">
            "however, i do have a very particular set of skills, skills i have
            acquired over a long career, skills that makes me an indispensable
            asset for people like you.."
          </motion.h1>
          <motion.div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <Skillscard key={index} skill={skill} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;
