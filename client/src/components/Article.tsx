import React, { useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { Blog } from "../shared/interface";

const Article = () => {
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

  const { title, content, media, author } = article;

  return (
    <div className="mx-2 relative min-h-screen w-screen overflow-x-hidden">
      <div className="h-full w-full my-10 flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 font-semibold">By {author?.name}</p>
        {media && (
          <img src={media} alt={title} className="object-contain w-[60%]" />
        )}
        <div className="w-[65%]">
          <p className="text-justify">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
