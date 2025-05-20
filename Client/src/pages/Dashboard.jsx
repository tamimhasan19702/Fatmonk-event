/** @format */

import { useEffect, useState } from "react";
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

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleFilter = () => {
    const filters = {};
    if (date) filters.date = date;
    if (location) filters.location = location;
    dispatch(fetchEvents(filters));
  };

  const handleClearFilter = () => {
    setDate("");
    setLocation("");
    dispatch(fetchEvents());
  };

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

        {/* Filter Controls */}
        <div className="max-w-screen-xl mx-auto px-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded bg-transparent"
            />
            <input
              type="text "
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded bg-transparent"
            />
            <button
              onClick={handleFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Filter
            </button>
            <button
              onClick={handleClearFilter}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Clear
            </button>
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
