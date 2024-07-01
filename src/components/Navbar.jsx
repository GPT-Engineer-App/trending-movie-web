import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gray-800 p-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;