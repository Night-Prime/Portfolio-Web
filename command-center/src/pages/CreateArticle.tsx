import React from "react";
import PrimaryContainer from "../shared/container/PrimaryContainer";
import Navbar from "../layouts/Navbar";

let navDetails: any = {
  title: "Save",
  onClick: () => {
    console.log("Saved!");
  },
};

const CreateArticle: React.FC = () => {
  return (
    <PrimaryContainer>
      <Navbar buttonDetails={navDetails} />
      <div className="h-full w-full m-6 flex flex-col">Creating Articles</div>
    </PrimaryContainer>
  );
};

export default CreateArticle;
