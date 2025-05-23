import { motion } from "framer-motion";
import { animations } from "../shared/animation";
import useScrollAnimation from "../hooks/useScrollAnimation";
import Card from "../shared/Card";

const SubHero: React.FC = () => {
  const childReveal = useScrollAnimation(animations.revealChildren);
  return (
    <motion.div className="h-auto md:h-screen w-full flex flex-col justify-center font-SF overflow-y-hidden">
      <motion.div className="w-full h-[90%] my-10 md:m-0 flex flex-col justify-center items-center">
        <motion.div className="flex flex-col items-center gap-8 md:gap-12 px-4 md:px-0">
          {/* Headline */}
          <motion.h1
            {...childReveal}
            className="text-2xl md:text-6xl font-semibold text-center"
          >
            Hi, I'm <span className="text-red-600">Daniel Abati </span>
            <br />I bring <span className="text-gray-300">Ideas</span> to{" "}
            <span className="text-green-600">Life</span>.
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            {...childReveal}
            className="text-xs sm:text-sm md:text-[16px] text-center w-full sm:w-4/5 md:w-3/4 font-Flux"
          >
            A Creative dynamo with a Swiss Army knife of skills: Problem
            Solving, Idea Generation, Coding, Landscape photography & Sharp
            writing. I don't just make things pretty – I make them work. Turning
            audacious ideas into show-stopping, effective realities is my jam.
            Ready to shake things up and deliver results that'll make your jaw
            drop.
          </motion.h2>

          {/* Cards */}
          <motion.div className="w-full flex flex-col sm:flex-row flex-wrap gap-6 md:gap-12 justify-center">
            <Card
              title="Projects"
              description="Couple of fun, exciting work in progress & finished projects that I've got to work on with some amazing devs & designers."
              link="https://github.com/Night-Prime"
            />
            <Card
              title="Products"
              description="The endgame is to build products that would be impactful to the users, help solve their pain points efficiently."
              link="/"
            />
            <Card
              title="Articles"
              description="I learn a ton of concepts, read research papers and tutorials, I intend to break them down in a way it benefits the readers."
              link="https://medium.com/@danielabatibabatunde1"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SubHero;
