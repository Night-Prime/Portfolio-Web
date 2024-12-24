import React, { useEffect } from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import { useFetch } from "../hooks/useFetch";
import { Blog } from "../shared/interface";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../shared/components/Loader";

const Home: React.FC = () => {
  const {
    loading,
    data: articles,
    error,
    refetch,
  } = useFetch<Blog[]>("/post/all");

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PrimaryContainer>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full">
          <h5 className="text-2xl underline my-4 font-bold">Recent Articles</h5>
          <div className="flex flex-row overflow-x-auto whitespace-nowrap">
            {articles && articles.length > 0 ? (
              articles.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full h-full bg-primary rounded-md flex flex-col items-start justify-center m-2 p-4 cursor-pointer"
                >
                  <RouterLink to={`/articles/${blog.id}`}>
                    <div className="flex flex-col items-center">
                      {blog.media ? (
                        <img
                          loading="eager"
                          src={blog.media}
                          alt={blog.title}
                          className="w-[150px] h-[150px] rounded-md mb-2 object-cover"
                        />
                      ) : (
                        <img
                          loading="eager"
                          src="https://via.placeholder.com/150"
                          alt={blog.title}
                          className="w-[150px] h-[150px] rounded-md mb-2 object-cover"
                        />
                      )}

                      <div className="text-highlight font-bold text-center">
                        {blog.title}
                      </div>
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
