// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white h-20">
      <div className="w-full    px-4 sm:px-6 lg:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-3xl w-[1500px] text-center mt-4  font-bold text-gray-800">
              Welcome to Form.com
            </span>
          </Link>
        </div>
        <p className="text-sm w-[1500px] text-center  font-bold text-gray-500 pb-1">
          This is a simple form builder
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
