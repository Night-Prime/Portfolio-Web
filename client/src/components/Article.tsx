import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { Blog } from "../shared/interface";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { motion } from "framer-motion";
import { animations } from "../shared/animation";

const Article = () => {
  const reveal = animations.scaleReveal;
  const revealChild = animations.childVariants;
  const { id } = useParams();
  const {
    loading,
    data: article,
    error,
    refetch,
  } = useFetch<Blog>(`/post/${id}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!article) {
    return <div>No article found.</div>;
  }

  const { title, content, media, author, createdAt } = article;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  let createdDate = formatDate(createdAt);

  return (
    <motion.div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <Navbar />
      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        className="flex-grow flex flex-col items-center pt-24 pb-10"
      >
        <motion.h1
          variants={revealChild}
          className="text-6xl font-bold text-center mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={revealChild}
          className="text-gray-600 font-semibold text-center mb-2"
        >
          By {author?.name}
        </motion.p>
        <motion.p
          variants={revealChild}
          className="text-gray-400 font-semibold text-center mb-6"
        >
          {createdDate}
        </motion.p>
        {media && (
          <motion.img
            variants={revealChild}
            src={media}
            alt={title}
            className="object-contain w-[70%] my-4 max-h-[400px] overflow-hidden"
          />
        )}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="w-[80%] max-w-3xl mt-6"
        >
          <motion.p variants={revealChild} className="text-justify">
            {content}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Article;
