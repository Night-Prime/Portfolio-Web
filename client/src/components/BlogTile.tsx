import React from "react";
import { Link } from "react-router-dom";

const BlogTile = ({ article }: any) => {
  const { author, title, content, media, id } = article;

  const getFirst20Words = (text: string) => {
    return (
      text.split(" ").slice(0, 20).join(" ") +
      (text.split(" ").length > 20 ? "..." : "")
    );
  };

  const excerpt = getFirst20Words(content);

  return (
    <div className="h-[90%] w-full my-auto cursor-pointer">
      <Link to={id}>
        <div className="w-full h-full flex flex-col gap-6">
          <img
            // loading="lazy"
            src={media}
            alt={title}
            className="w-full h-[300px] object-cover rounded-t-md"
          />
          <div className="mx-5 flex flex-col gap-2">
            <h1 className="font-SF font-bold text-4xl text-black">
              {title.toUpperCase()}
            </h1>
            <p className="text-sm">{excerpt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogTile;
