/** @format */

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background shadow dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-6 sm:flex sm:items-center sm:justify-between">
        {/* Left side: Brand */}
        <Link to="/" className="flex items-center mb-4 sm:mb-0">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground dark:text-white">
            EventManager
          </span>
        </Link>

        {/* Right side: Links */}
        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-foreground sm:mb-0 dark:text-gray-400">
          <li>
            <Link
              to="#"
              className="hover:underline me-4 md:me-6 hover:text-primary">
              About
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="hover:underline me-4 md:me-6 hover:text-primary">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="#" className="hover:underline hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Text */}
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700" />
      <span className="block text-sm text-foreground text-center pb-6 dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <Link to="/" className="hover:underline text-primary">
          EventManager™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
