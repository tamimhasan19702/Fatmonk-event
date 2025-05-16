/** @format */

import Header from "../components/Header";
import Footer from "../components/footer";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      <div className="min-h-screen  flex flex-col items-start justify-start bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-10 text-start">
          <h1 className="text-3xl font-bold mb-4">Welcome {user.name}</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
