/** @format */

import Footer from "../components/footer";
import Header from "../components/Header";
import { Link } from "react-router";
import animation from "../assets/professionals.json";
import Lottie from "react-lottie";
import LoginForm from "../components/loginForm";

const Login = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-background gap-10 px-4 py-10">
        <div className="w-full md:w-1/2 lg:w-1/2 text-left flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground text-center">
            Welcome to EventManager
          </h1>

          <p className="mb-5 text-foreground text-center">
            Dont have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline dark:text-blue-500">
              Register
            </Link>
          </p>

          <LoginForm />
        </div>

        {/* Registration Form Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 flex justify-center items-center  ">
          <div className="w-full sm:w-full md:w-full max-w-lg h-auto">
            <Lottie options={defaultOptions} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
