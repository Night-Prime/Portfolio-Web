import { motion } from "framer-motion";
import { animations } from "../shared/animation";
import useScrollAnimation from "../hooks/useScrollAnimation";
import Card from "../shared/Card";

const SubHero: React.FC = () => {
  const childReveal = useScrollAnimation(animations.revealChildren);
  return (
    <motion.div className="h-screen w-full flex flex-col justify-center font-SF overflow-y-hidden">
      <motion.div className="w-full h-[90%] flex flex-col justify-center items-center">
        <motion.div className="flex flex-col items-center gap-12">
          <motion.h1 {...childReveal} className="text-6xl font-semibold ">
            Hi, I'm <span className="text-red-600">Daniel Abati </span>
            <br />I bring <span className="text-gray-300">Ideas</span> to{" "}
            <span className="text-green-600">Life</span>.
          </motion.h1>
          <motion.h2
            {...childReveal}
            className="text-[16px] text-center w-3/4 font-Flux"
          >
            A Creative dynamo with a Swiss Army knife of skills: Problem
            Solving, Idea Generation, Coding, Landscape photography & Sharp
            writing. I don't just make things pretty – I make them work. Turning
            audacious ideas into show-stopping, effective realities is my jam.
            Ready to shake things up and deliver results that'll make your jaw
            drop.
          </motion.h2>
          <motion.div className="w-full h-full flex flex-wrap gap-12 justify-center">
            <Card
              title="Projects"
              description="Couple of fun, exciting work in progress & finished projects that i've got to work on with some amazing devs & designers."
              //   icon={<FontAwesomeIcon icon={faCode} size="2x" />}
              link="/"
            />
            <Card
              title="Products"
              description="The endgame is to build products that would be impactful to the users, help solve their pain points efficiently."
              //   icon={<FontAwesomeIcon icon={faBook} size="2x" />}
              link="/"
            />
            <Card
              title="Articles"
              description="I learn a ton of concepts, read research papers and tutorials,i intend to break them down in a way it benefits the readers."
              //   icon={<FontAwesomeIcon icon={faRocket} size="2x" />}
              link="/"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SubHero;
