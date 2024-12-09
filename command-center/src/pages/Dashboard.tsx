import React from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import { Outlet } from "react-router";
import Navbar from "../layouts/Navbar";

let navDetails: { title: string; link: string } = {
  title: "Create Blog",
  link: "/articles/create",
};

const Dashboard: React.FC = () => {
  return (
    <PrimaryContainer>
      <div className="h-auto w-full flex flex-col">
        <Navbar buttonDetails={navDetails} />
        <div className="h-full w-full my-10">
          <h1 className="text-9xl text-center">DASHBOARD.</h1>
          <div className="mx-auto w-[80%] h-1 my-6"></div>
        </div>
      </div>
      <div className="w-[99%] h-auto mx-auto overflow-y-scroll">
        <Outlet />
      </div>
    </PrimaryContainer>
  );
};

export default Dashboard;
