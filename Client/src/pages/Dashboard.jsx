/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import Header from "../components/Header";
import Footer from "../components/footer";
import EventComponent from "../components/EventComponent";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, loading, error } = useSelector((state) => state.events);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEventClick = (eventId) => {
    navigate(`/single-event/${eventId}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-start md:items-start">
          <h1 className="text-3xl font-bold text-left mb-6 sm:mb-0">
            Welcome {user?.name || "User"}
          </h1>
          <div className="sm:mt-0 mt-3">
            <Link
              to="/add-event"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:w-auto w-full block text-center">
              Add Event
            </Link>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-4">
          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.length > 0
              ? events.map((event) => (
                  <div
                    key={event._id}
                    className="cursor-pointer"
                    onClick={() => handleEventClick(event._id)}>
                    <EventComponent event={event} />
                  </div>
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
