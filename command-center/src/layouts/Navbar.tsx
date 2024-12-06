import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface ButtonDetails {
  title: string;
  link?: string;
  onClick?: () => void;
}

interface NavbarProps {
  buttonDetails: ButtonDetails;
}

const Navbar: React.FC<NavbarProps> = ({ buttonDetails }) => {
  const { title, link } = buttonDetails;
  return (
    <div className="w-full h-24">
      <div className="h-full w-full flex flex-row justify-between items-center mx-auto">
        <h3 className="text-2xl">Insights</h3>
        <button className="font-bold border-2 border-white rounded-full px-4 py-2 cursor-pointer hover:bg-white hover:text-gray-700">
          <RouterLink to={`${link}`}>{title}</RouterLink>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
