import { motion} from "framer-motion";
import logo from "../assets/images/logo-white.png";
import { Link } from "react-router-dom";
import { animations } from "../shared/animation";
import { useRef, useState } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import { Cancel } from "@mui/icons-material";

const navLinks = [
  { name: "Me", path: "/" },
  { name: "Blog", path: "https://medium.com/@danielabatibabatunde1"},
  { name: "Projects", path: "https://github.com/Night-Prime"},
  // { name: "Products", path: "/products" },
];

const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const ref = useRef(null);
  const containerVariants = animations.containerVariants;
  const childVariants = animations.childVariants;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 w-full h-20 font-SF flex justify-center items-center py-6 px-6 sm:px-8 lg:px-12 bg-black bg-opacity-70 backdrop-blur-md shadow-lg"
    >
      <motion.div className="w-[99%] flex flex-row justify-between">
        <motion.img
          variants={childVariants}
          src={logo}
          className="object-contain w-12  ml-0 lg:-ml-12"
        />

        <motion.div className="lg:hidden z-50">
          {menu ? (
            <Cancel onClick={toggleMenu} className="text-white w-8 h-8" />
          ) : (
            <CameraIcon onClick={toggleMenu} className="text-white w-8 h-8" />
          )}
        </motion.div>

        {/* Menu for large screens */}
        <motion.ul
          variants={containerVariants}
          className="hidden lg:flex space-x-6"
          style={{ color: "white" }}
        >
          {navLinks.map(({ name, path }) => (
            <motion.li
              key={name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={childVariants}
            >
              <Link to={path}>{name}</Link>
            </motion.li>
          ))}
        </motion.ul>

        {menu && (
          <motion.div
            className="fixed top-0 right-0 w-full md:w-3/4 h-screen bg-gray-900 flex flex-col justify-center items-center z-20"
            variants={containerVariants}
          >
            <motion.ul
              variants={containerVariants}
              className="text-white space-y-4"
            >
              {navLinks.map(({ name, path }) => (
                <motion.li
                  variants={childVariants}
                  key={name}
                  onClick={toggleMenu}
                >
                  <Link to={`/${path}`} className="text-2xl">
                    {name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Navbar;
