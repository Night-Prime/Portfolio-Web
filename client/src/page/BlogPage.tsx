import React, { FC, useRef } from "react";
import useFetch from "../hooks/useFetch";
import { Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
import { animations } from "../shared/animation";
import BlogTile from "../components/BlogTile";
import { Blog } from "../shared/interface";

const Navbar = () => {
  const ref = useRef(null);
  const containerVariants = animations.containerVariants;
  const childVariants = animations.childVariants;
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white fixed top-0 left-0 right-0 z-50 w-full h-24 font-SF"
    >
      <motion.div className="h-full w-[95%] border-2 border-white border-b-black mx-auto flex justify-between items-end py-2">
        <motion.div className="flex-1">
          <motion.h1 variants={childVariants} className="font-bold">
            DHANIEL'S INSIGHTS
          </motion.h1>
        </motion.div>

        <motion.div className="flex-1 flex flex-row justify-end items-center">
          <ul className="flex gap-6 mr-6">
            {/* <li>Technical</li>
            <li>Others</li> */}
          </ul>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-2"
          >
            <motion.a variants={childVariants} href="/">
              <Instagram />
            </motion.a>
            <motion.a variants={childVariants} href="/">
              <Twitter />
            </motion.a>
            <motion.a variants={childVariants} href="/">
              <LinkedIn />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const scale = animations.scaleReveal;
  const scaleChild = animations.scaleRevealChildren;
  return (
    <motion.div
      variants={scale}
      initial="hidden"
      animate="visible"
      className="h-1/3 w-full flex justify-center items-center font-SF py-6"
    >
      <motion.h1
        variants={scaleChild}
        className="text-6xl xl:text-[15rem] my-6 font-bold"
      >
        ARTICLES.
      </motion.h1>
    </motion.div>
  );
};

const Grid = () => {
  const reveal = animations.scaleReveal;
  const revealChild = animations.childVariants;

  const {
    loading,
    data: blogs,
    error,
    refetch,
  } = useFetch<Blog[]>("/post/all");

  console.log("Here: ", blogs);

  return (
    <motion.div className="h-full my-10 w-full flex flex-col font-SF items-center gap-6">
      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        className="w-[95%] flex flex-row justify-between items-end"
      >
        <motion.h3 variants={revealChild} className="flex-1 font-semibold">
          CATEGORIES
        </motion.h3>
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="flex flex-1 justify-end gap-4"
        >
          <motion.button
            variants={revealChild}
            className="border border-black rounded-full px-2 py-1 cursor-pointer hover:bg-black hover:text-white"
          >
            Technical
          </motion.button>
          <motion.button
            variants={revealChild}
            className="border border-black rounded-full px-2 py-1 cursor-pointer hover:bg-black hover:text-white"
          >
            Insights
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        className="w-[95%] h-full rounded-full grid grid-cols-3 gap-4"
      >
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <motion.div
              key={blog.id}
              variants={revealChild}
              className="bg-gray-200 rounded-md"
            >
              <BlogTile article={blog} />
            </motion.div>
          ))
        ) : (
          <div>No Blogs Available</div>
        )}
      </motion.div>
    </motion.div>
  );
};

const BlogPage: FC = () => {
  return (
    <div className="mx-2 relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <section className="mt-20 min-h-screen relative z-0">
        <Hero />
        <Grid />
      </section>
    </div>
  );
};

export default BlogPage;
