/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import Header from "../components/Header";
import Footer from "../components/footer";
import EventComponent from "../components/eventComponent";
import { Link } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-left mb-6">
            Welcome {user?.name || "User"}
          </h1>
          <Link
            to="/event-form"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add Event
          </Link>
        </div>
        <div className="max-w-screen-xl mx-auto px-4">
          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.length > 0
              ? events.map((event) => (
                  <EventComponent key={event._id} event={event} />
                ))
              : !loading && <p>No events found.</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
