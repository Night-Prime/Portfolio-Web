import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { animations } from "../shared/animation";

const Footer: React.FC = () => {
  const childReveal = useScrollAnimation(animations.revealChildren);
  const year = new Date().getFullYear();
  return (
    <motion.div className="h-auto md:h-screen w-full flex items-end justify-center font-Flux overflow-y-hidden">
      <motion.div className="flex flex-col bg-black w-full h-full md:h-[80%]">
        <motion.div className="w-full h-full text-white">
          <motion.div className="flex flex-col md:flex-row w-full h-full my-10 md:my-0 gap-10 md:gap-0">
            {/* Left Section */}
            <motion.div className="flex-1 my-auto mx-6">
              <motion.h1
                {...childReveal}
                className="text-3xl md:text-6xl font-Flux font-bold text-center md:text-left"
              >
                This is the Part
                <br /> where you reach out <br />
                and we collaborate <br /> to make magic!
              </motion.h1>
            </motion.div>

            {/* Right Section */}
            <motion.div className="flex-1 my-auto mx-8">
              <motion.div className="flex flex-col gap-4 justify-center md:justify-end items-center md:items-end">
                <motion.div>
                  <motion.h1 className="text-lg md:text-2xl text-center md:text-right">
                    Email
                  </motion.h1>
                  <motion.h1
                    {...childReveal}
                    className="text-center md:text-right"
                  >
                    danielabatibabatunde1@gmail.com
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 className="text-lg md:text-2xl text-center md:text-right">
                    Twitter
                  </motion.h1>
                  <motion.h1
                    {...childReveal}
                    className="text-center md:text-right"
                  >
                    @dhanieltunde
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 className="text-lg md:text-2xl text-center md:text-right">
                    Instagram
                  </motion.h1>
                  <motion.h1
                    {...childReveal}
                    className="text-center md:text-right"
                  >
                    @_iamdhaniel
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 className="text-lg md:text-2xl text-center md:text-right">
                    Phone (WhatsApp)
                  </motion.h1>
                  <motion.h1
                    {...childReveal}
                    className="text-center md:text-right"
                  >
                    +2348116256294
                  </motion.h1>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="w-full">
          <motion.h1
            {...childReveal}
            className="mx-auto text-white text-4xl font-semibold text-center"
          >
            Dhaniel. {year}.
          </motion.h1>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
