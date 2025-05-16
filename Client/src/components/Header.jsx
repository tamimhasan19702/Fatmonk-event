/** @format */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, resetAuthState } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetAuthState());
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-background border-gray-200 dark:bg-gray-900 shadow">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="App Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground dark:text-white">
            EventManager
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-foreground rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
            aria-hidden="true">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Nav Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-background md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {user ? (
              <>
                <li
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md cursor-pointer">
                  Logout
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-foreground rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-foreground rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-secondary md:p-0 dark:text-white md:dark:hover:text-secondary">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
