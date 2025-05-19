/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, updateEvent } from "../features/events/eventsSlice";
import Header from "../components/Header";
import Footer from "../components/footer";

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { eventDetails, loading, error } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: null,
    bannerImage: "",
  });

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (eventDetails) {
      const { name, description, location, date, time, bannerImage } =
        eventDetails;

      setFormData({
        title: name || "",
        description: description || "",
        location: location || "",
        date: date ? new Date(date).toISOString().slice(0, 10) : "",
        time: time || "",
        image: null,
        bannerImage: bannerImage || "",
      });
    }
  }, [eventDetails]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("time", formData.time);
    data.append("date", formData.date);

    if (formData.image) {
      data.append("bannerImage", formData.image);
    }

    dispatch(updateEvent({ id, formData: data }))
      .unwrap()
      .then(() => {
        navigate("/single-event/" + id);
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-md mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">Edit Event</h1>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && eventDetails && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border bg-transparent text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border bg-transparent text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border bg-transparent text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border bg-transparent text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border bg-transparent text-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Current Banner</label>
                <img
                  className="w-32 h-32 rounded-md mb-2"
                  src={formData.bannerImage}
                  alt={formData.title}
                />
                <label className="block mb-1">
                  Upload New Image (optional)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Update Event
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditEvent;
