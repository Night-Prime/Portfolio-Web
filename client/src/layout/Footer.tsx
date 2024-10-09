import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { animations } from "../shared/animation";

const Footer: React.FC = () => {
  const childReveal = useScrollAnimation(animations.revealChildren);
  return (
    <motion.div className="h-screen w-full flex items-end justify-center font-Flux overflow-y-hidden">
      <motion.div className="flex flex-col w-full h-[90%]">
        <motion.div className="w-full h-full bg-black text-white">
          <motion.div className="flex flex-row w-full h-full">
            <motion.div className="flex-1 my-auto mx-6">
              <motion.h1
                {...childReveal}
                className="text-6xl font-Flux font-bold"
              >
                This is the Part
                <br /> where you reach out <br />
                and we collaborate <br /> to make magic!
              </motion.h1>
            </motion.div>
            <motion.div className="flex-1 my-auto mx-8">
              <motion.div className="flex flex-col gap-4 justify-end items-end">
                <motion.div>
                  <motion.h1 {...childReveal} className="text-2xl text-right">
                    Email
                  </motion.h1>
                  <motion.h1 {...childReveal} className="text-right">
                    danielabatibabatunde1@gmail.com
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 {...childReveal} className="text-2xl text-right">
                    Twitter
                  </motion.h1>
                  <motion.h1 {...childReveal} className="text-right">
                    @dhanieltunde
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 {...childReveal} className="text-2xl text-right">
                    Instagram
                  </motion.h1>
                  <motion.h1 {...childReveal} className="text-right">
                    {" "}
                    @_iamdhaniel
                  </motion.h1>
                </motion.div>
                <motion.div>
                  <motion.h1 {...childReveal} className="text-2xl text-right">
                    Phone (WhatsApp)
                  </motion.h1>
                  <motion.h1 className="text-right">+2348116256294</motion.h1>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;
