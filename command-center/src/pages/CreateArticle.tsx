import React, { useEffect, useState } from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import Navbar from "../layouts/Navbar";
import Editor from "../shared/components/Editor";
import { makeRequest } from "../service/request";
import Preview from "../components/Preview";
import { Article } from "../shared/interface";
import { useNavigate } from "react-router";
import { NotificationType, showNotification } from "../service/notification";
import Loader from "../shared/components/Loader";

const CreateArticle: React.FC = () => {
  let user: any = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const [loading, setLoading] = useState(false);
  const [articleContent, setArticleContent] = useState<Article>({
    userId: user?.id || "",
    published: false,
    media: null,
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
    setPreviewArticle(true);

    if (navDetails.title === "Save") {
      const formData = new FormData();
      formData.append("userId", articleContent.userId);
      formData.append("title", articleContent.title);
      formData.append("published", JSON.stringify(articleContent.published));
      formData.append("content", JSON.stringify(articleContent.content));

      if (articleContent.media) {
        formData.append("media", articleContent.media);
      }
      setLoading(true);
      try {
        const response = await makeRequest.post("post/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response && response.status === "success") {
          showNotification(
            "Article created successfully",
            NotificationType.SUCCESS
          );
          navigate("/dashboard");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        showNotification("Failed to create article", NotificationType.ERROR);
      }
      setLoading(false);
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

  const handleCoverImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the image
      // const previewUrl = URL.createObjectURL(file);

      setArticleContent((prev) => ({
        ...prev,
        media: file,
      }));
    }
  };

  if (loading) {
    return <Loader />;
  }

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
            <div className="relative w-[50%] my-6 mx-auto h-60 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              {articleContent.media ? (
                <img
                  src={URL.createObjectURL(articleContent.media)}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">Upload an image</span>
              )}
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                onChange={handleCoverImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <Editor onChange={handleEditorChange} />
          </form>
        </div>
      )}
    </PrimaryContainer>
  );
};

export default CreateArticle;
