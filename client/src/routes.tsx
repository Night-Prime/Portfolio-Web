import { Suspense, lazy, useState } from "react";
import type { RouteObject } from "react-router";
import LoadingScreen from "./components/LoadingScreen";
import BlogPage from "./page/BlogPage";

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense
      fallback={<LoadingScreen onLoadComplete={props.onLoadComplete} />}
    >
      <Component {...props} />
    </Suspense>
  );

const LandingPage = Loadable(lazy(() => import("./page/LandingPage")));

const Routes = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete ? (
        <LoadingScreen onLoadComplete={() => setLoadingComplete(true)} />
      ) : (
        <LandingPage />
      )}
    </>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Routes />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
];

export default routes;
