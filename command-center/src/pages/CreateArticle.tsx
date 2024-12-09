import React, { useEffect, useState } from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import Navbar from "../layouts/Navbar";
import Editor from "../shared/components/Editor";
import { makeRequest } from "../service/request";
import Preview from "../components/Preview";
import { Article } from "../shared/interface";
import { useNavigate } from "react-router";
import { NotificationType, showNotification } from "../service/notification";

let user: any = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const CreateArticle: React.FC = () => {
  const [articleContent, setArticleContent] = useState<Article>({
    userId: user?.id || "",
    published: false,
    title: "",
    content: [],
  });

  const [previewArticle, setPreviewArticle] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  // Tracking the validity of my Form
  useEffect(() => {
    const hasTitle = articleContent.title.trim() !== "";
    const hasContent =
      Array.isArray(articleContent.content) &&
      articleContent.content.length > 0;
    setIsFormValid(hasTitle && hasContent);
  }, [articleContent.title, articleContent.content]);

  const navDetails: any = {
    title: previewArticle ? "Save" : "Preview",
    link: null,
    onClick: () => {
      handleSubmit();
    },
    state: isFormValid ? false : true,
  };

  const handleSubmit = async () => {
    console.log("ArticleContent: ", articleContent);
    setPreviewArticle(true);

    if (navDetails.title === "Save") {
      console.log("Saved: ", articleContent);
      const response = await makeRequest.post("post/create", articleContent);
      if (response && response.status === "success") {
        showNotification(
          "Article created successfully",
          NotificationType.SUCCESS
        );
        console.log("Response: ", response);
        navigate("/dashboard");
      }
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setArticleContent((prev) => ({
      ...prev,
      title: newTitle,
    }));
  };

  const handleEditorChange = (data: any) => {
    const newContent = data.blocks;
    setArticleContent((prev) => ({
      ...prev,
      published: true,
      content: newContent,
    }));
  };

  return (
    <PrimaryContainer>
      <Navbar buttonDetails={navDetails} />
      {previewArticle ? (
        <Preview article={articleContent} />
      ) : (
        <div className="h-full w-full m-6 flex flex-col">
          <h1 className="w-full text-center my-4 font-light italic">
            Share your new ideas, experience & lessons with the world.
          </h1>
          <form className="w-full h-auto flex flex-col">
            <input
              type="text"
              value={articleContent.title}
              name="title"
              onChange={handleTitleChange}
              className="h-[20vh] w-[90%] border-none bg-transparent placeholder:text-6xl text-6xl text-center placeholder:text-center placeholder:italic italic"
              placeholder="Title"
              style={{ outline: "none" }}
              required
            />
            <Editor onChange={handleEditorChange} />
          </form>
        </div>
      )}
    </PrimaryContainer>
  );
};

export default CreateArticle;
