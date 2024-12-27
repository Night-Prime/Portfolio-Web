import React from "react";
import { Link } from "react-router-dom";

const BlogTile = ({ article }: any) => {
  const { title, media, id } = article;

  return (
    <div className="h-[90%] w-full my-auto cursor-pointer">
      <Link to={id}>
        <div className="w-full h-full flex flex-col gap-6">
          <img
            loading="lazy"
            src={media}
            alt={title}
            className="w-full h-[300px] object-cover rounded-t-md"
          />
          <div className="mx-5 flex flex-col gap-2">
            <h1 className="font-SF font-bold text-4xl text-black">
              {title.toUpperCase()}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogTile;
