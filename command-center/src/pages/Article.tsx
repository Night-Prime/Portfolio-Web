import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useFetch } from "../hooks/useFetch";
import Loader from "../shared/components/Loader";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import Navbar from "../layouts/Navbar";

const Article: React.FC = () => {
  const { id } = useParams();

  const navDetails: any = {
    title: "All Blogs",
    link: "/articles",
  };

  const {
    loading,
    data: article,
    error,
    refetch,
  } = useFetch<any>(`/post/${id}`);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  const { title, content, media, author } = article;
  let parsedContent =
    typeof content === "string" ? JSON.parse(content) : content;

  return (
    <PrimaryContainer>
      <Navbar buttonDetails={navDetails} />
      <div className="w-full h-auto flex flex-col">
        <h1 className="w-full text-4xl text-center my-2 mt-6 font-bold">
          <span className="text-highlight">"{title}"</span>
        </h1>
        <h2 className="w-full text-2xl text-center my-0 font-bold">
          <span className="text-black">By {author?.name}</span>
        </h2>
        {media && (
          <div className="w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
            <img
              src={media}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="w-full text-justify p-4">
          {parsedContent &&
            parsedContent.map((block: any) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p key={block.id} className="mb-4">
                      {block.data.text}
                    </p>
                  );
                case "header":
                  return (
                    <h2 key={block.id} className="text-2xl font-semibold my-4">
                      {block.data.text}
                    </h2>
                  );
                case "list":
                  return (
                    <ul key={block.id} className="list-disc list-inside mb-4">
                      {block.data.items?.map((item: any, index: number) => (
                        <li key={`${block.id}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={block.id}
                      className="border-l-4 pl-4 italic my-4 text-gray-600"
                    >
                      {block.data.text}
                    </blockquote>
                  );
                case "image":
                  return (
                    <div className="w-full max-w-md mx-auto my-2">
                      <img
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
      </div>
    </PrimaryContainer>
  );
};

export default Article;
