import { FaGithubSquare } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <nav className="flex justify-between sticky top-0 items-center p-4 px-8 bg-white shadow-md">
      {/* Left side - Logo and GitHub */}
      <div className="flex items-center gap-4">
        {/* Logo with SVG */}
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-lg"
          >
            <rect width="40" height="40" rx="8" fill="#4F46E5" />
            <path d="M14 12H26V16H22V28H18V16H14V12Z" fill="white" />
          </svg>
          <span className="text-xl font-bold text-gray-900">Tsender</span>
        </div>

        {/* GitHub Icon */}
        <a
          href="https://github.com/aditya45210l/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
        >
          <FaGithubSquare size={28} className="hidden sm:block" />
        </a>
      </div>

      {/* Right side - Connect Button */}
      <div >
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
