import React, { useEffect } from "react";
import { Article } from "../shared/interface";
import PrimaryContainer from "../shared/container/PrimaryContainer";

interface ArticleDetails {
  article: Article;
}

const Preview: React.FC<ArticleDetails> = ({ article }) => {
  const { title, content, media } = article;

  useEffect(() => {}, [content, media]);

  return (
    <PrimaryContainer>
      <div className="w-full h-auto flex flex-col">
        <h1 className="w-full text-4xl text-center my-6 font-bold">
          <span className="text-highlight">"{title}"</span>
        </h1>
        {media && (
          <div className="w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
            <img
              src={URL.createObjectURL(media)}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="w-full text-justify p-4">
          {content.map((block) => {
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

export default Preview;
