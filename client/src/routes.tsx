import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

const LandingPage = Loadable(lazy(() => import("./page/LandingPage")));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
];

export default routes;
