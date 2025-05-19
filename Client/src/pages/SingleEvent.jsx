/** @format */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";
import { fetchEventById, deleteEvent } from "../features/events/eventsSlice";
import { getUser } from "../features/auth/authSlice";

const SingleEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    user,
    userInfo,
    loading: userLoading,
  } = useSelector((state) => state.auth);
  const { eventDetails, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (eventDetails?.user) {
      dispatch(getUser(eventDetails.user));
    }
  }, [dispatch, eventDetails?.user]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(id)).then(() => {
        navigate("/dashboard");
      });
    }
  };

  const isOwner = user?._id === eventDetails?.user;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          {loading ? (
            <p>Loading...</p>
          ) : eventDetails ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <img
                src={`https://fatmonk-event.onrender.com/${eventDetails.bannerImage.replace(
                  /\\/g,
                  "/"
                )}`}
                alt="Event Banner"
                className="w-full h-64 object-cover rounded-md mb-6"
              />
              <h2 className="text-3xl font-bold mb-2">{eventDetails.name}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                {eventDetails.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>Date:</strong>{" "}
                {new Date(eventDetails.date).toDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>Time:</strong> {eventDetails.time}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                <strong>Location:</strong> {eventDetails.location}
              </p>

              <p className="text-sm text-gray-500 mt-4">
                <strong>Created by:</strong>{" "}
                {userLoading
                  ? "Loading..."
                  : userInfo?.name || userInfo?.email || "Unknown"}
              </p>

              {isOwner && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => navigate(`/edit-event/${id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Event not found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleEvent;
