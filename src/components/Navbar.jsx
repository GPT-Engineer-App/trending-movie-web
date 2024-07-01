import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;