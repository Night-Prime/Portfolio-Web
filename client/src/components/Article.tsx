import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { Blog } from "../shared/interface";
import Navbar from "../layout/Navbar";
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
  let parsedContent =
    typeof content === "string" ? JSON.parse(content) : content;

  return (
    <motion.div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <Navbar />
      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        className="flex-grow flex flex-col items-center py-[25%] lg:py-[10%]"
      >
        <motion.h1
          variants={revealChild}
          className="text-4xl lg:text-6xl font-bold text-center mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={revealChild}
          className="text-gray-600 font-bold text-center mb-2"
        >
          <span className="text-lg italic font-paragraph ">{author?.name}</span>
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
          <div className="w-full text-justify p-4">
            {parsedContent &&
              parsedContent.map((block: any) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={block.id} className="mb-4 font-paragraph text-xl">
                        {block.data.text}
                      </p>
                    );
                  case "header":
                    return (
                      <h2
                        key={block.id}
                        className="text-2xl font-semibold my-4"
                      >
                        {block.data.text}
                      </h2>
                    );
                  case "list":
                    return (
                      <ul key={block.id} className="list-disc list-inside mb-4">
                        {block.data.items?.map((item: any, index: number) => (
                          <li
                            className="font-paragraph text-xl"
                            key={`${block.id}-${index}`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  case "quote":
                    return (
                      <blockquote
                        key={block.id}
                        className="border-l-4 pl-4 italic font-paragraph my-4 text-gray-600"
                      >
                        {block.data.text}
                      </blockquote>
                    );
                  case "image":
                    return (
                      <div className="w-full max-w-md mx-auto my-2">
                        <img
                          loading="lazy"
                          key={block.id}
                          src={block.data.file.url}
                          alt={block.data.caption || "Image"}
                          className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                        {block.data.caption && (
                          <p className="text-center text-sm text-gray-600 mt-2">
                            {block.data.caption}
                          </p>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Article;
