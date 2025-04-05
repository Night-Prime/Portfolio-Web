import ArrowRight from "../assets/icons/ArrowRight";
import useScrollAnimation from "../hooks/useScrollAnimation";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { animations } from "../shared/animation";

const Projects: React.FC = () => {
  const boxReveal = useScrollAnimation(animations.revealChildren);
  return (
    <div
      {...boxReveal}
      className="h-auto md:h-screen w-full flex flex-row justify-center items-center font-SF overflow-y-hidden"
    >
      <div className="w-[86%] h-[82%] grid grid-cols-12 grid-rows-12 gap-3 my-10 md:m-0">
        <div
          // {...boxReveal}
          //   transition={{ duration: 1, delay: getDelay(0) }}
          className="col-span-12 row-span-12  md:col-span-7 md:row-span-7 bg-gray-100 rounded-2xl "
        >
          <div className="w-full h-full flex flex-col justify-center md:mx-6">
            <h1 className=" text-2xl md:text-6xl font-bold font-Flux flex flex-col items-center md:items-start">
              <span className="w-full md:w-[55%] flex flex-row justify-center md:justify-between items-center md:mb-2">
                Projects
                <span className="hidden md:block">
                  <ArrowRight />
                </span>
              </span>
              I'm currently
              <br />
              working on
            </h1>
          </div>
        </div>
        <div
          // {...boxReveal}
          //   transition={{ duration: 1, delay: getDelay(1) }}
          className="col-span-12 row-span-6 md:col-span-5 md:row-span-12 text-center bg-gray-100  rounded-2xl relative"
        >
          <motion.div
            className="w-full h-full absolute inset-0 bg-gray-300 rounded-2xl opacity-25 cursor-pointer"
            whileHover={{
              backgroundColor: "black",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              opacity: 0.95,
              transition: { duration: 0.25 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 200 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full text-white text-lg font-bold flex flex-col gap-8 justify-center items-center"
            >
              <p className="text-xs text-center w-[60%] font-light font-flux">
                May Gardens is a comprehensive event management and booking
                platform empowers clients to easily book and manage events,
                while also automating the administrative tasks associated with
                successful deals
              </p>

              <Link
                to="https://maygardens.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-xs"
              >
                May Gardens
              </Link>
            </motion.div>
          </motion.div>
          <img
            src="https://ik.imagekit.io/0y99xuz0yp/Screenshot%202025-04-05%20at%2009.31.19.png?updatedAt=1743841975231"
            alt="Mayflower screenshot"
            className="object-cover w-[100%] h-[100%] rounded-2xl"
          />
        </div>
        <div
          // {...boxReveal}
          //   transition={{ duration: 1, delay: getDelay(2) }}
          className="col-span-12 row-span-12 md:col-span-7 md:row-span-5 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3"
        >
          <motion.div className="text-center bg-gray-100  rounded-2xl relative">
            <motion.div
              className="absolute inset-0 bg-gray-300 rounded-2xl opacity-25 cursor-pointer"
              whileHover={{
                backgroundColor: "black",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                opacity: 0.95,
                transition: { duration: 0.25 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full text-white text-lg font-bold flex flex-col gap-8 justify-center items-center"
              >
                <Link
                  to="https://brailoo-info-mvp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-xs"
                >
                  Brailoo
                </Link>
              </motion.div>
            </motion.div>
            <img
              src="https://ik.imagekit.io/0y99xuz0yp/brailoo.png?updatedAt=1729068718941"
              alt="brailoo screenshot"
              className="object-cover w-full h-full object-center rounded-2xl"
            />
          </motion.div>
          <div className="text-center bg-gray-100  rounded-2xl relative">
            <motion.div
              className="absolute inset-0 bg-gray-300 rounded-2xl opacity-25 cursor-pointer"
              whileHover={{
                backgroundColor: "black",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                opacity: 0.95,
                transition: { duration: 0.25 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full text-white text-lg font-bold flex flex-col gap-8 justify-center items-center"
              >
                <Link
                  to="https://sheryham-web.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out text-xs"
                >
                  Sheryham
                </Link>
              </motion.div>
            </motion.div>
            <img
              src="https://ik.imagekit.io/0y99xuz0yp/Sheryham.webp?updatedAt=1729069555738"
              alt="sheryham screenshot"
              className="object-cover w-full h-full object-center rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
