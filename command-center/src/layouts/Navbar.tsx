import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface ButtonDetails {
  title: string;
  link?: string;
  onClick?: () => void;
  state?: boolean;
}

interface NavbarProps {
  buttonDetails: ButtonDetails;
}

const Navbar: React.FC<NavbarProps> = ({ buttonDetails }) => {
  const { title, link, onClick, state } = buttonDetails;
  return (
    <div className="w-full h-24">
      <div className="h-full w-full flex flex-row justify-between items-center mx-auto">
        <h3 className="text-2xl">Insights</h3>
        {link ? (
          <button className="font-extrabold border-2 border-black rounded-3xl px-4 py-2 cursor-pointer hover:text-white hover:bg-highlight hover:border-highlight">
            <RouterLink to={`${link}`}>{title}</RouterLink>
          </button>
        ) : (
          <button
            onClick={onClick}
            disabled={state}
            className="font-extrabold border-2 border-black rounded-3xl px-4 py-2 cursor-pointer hover:text-white hover:bg-highlight hover:border-highlight"
          >
            {title}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
