import React, { useEffect } from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import { useFetch } from "../hooks/useFetch";
import { Blog } from "../shared/interface";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  const {
    loading,
    data: articles,
    error,
    refetch,
  } = useFetch<Blog[]>("/post/all");

  useEffect(() => {
    refetch();
  }, []);

  return (
    <PrimaryContainer>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full">
          <h5 className="text-2xl underline my-4 font-bold">Recent Articles</h5>
          <div className="overflow-x-auto whitespace-nowrap">
            {articles && articles.length > 0 ? (
              articles.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-primary rounded-md inline-block m-2 p-4 cursor-pointer"
                >
                  <RouterLink to={``}>
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                      className="w-full h-auto rounded-md mb-2"
                    />
                    <div className="text-highlight font-bold text-center">
                      {blog.title}
                    </div>
                  </RouterLink>
                </div>
              ))
            ) : (
              <div className="w-full h-full mx-auto my-10 text-center">
                <h6 className="text-xl font-semibold">
                  No Articles written yet
                </h6>
                <button className="my-4 font-extrabold border-2 border-black rounded-3xl px-4 py-2 cursor-pointer hover:text-white hover:bg-highlight hover:border-highlight">
                  <RouterLink to="/articles/create">
                    Write an Article
                  </RouterLink>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrimaryContainer>
  );
};

export default Home;
