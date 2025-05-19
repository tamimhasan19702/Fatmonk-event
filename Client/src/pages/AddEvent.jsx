/** @format */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../features/events/eventsSlice";
import Header from "../components/Header";
import Footer from "../components/footer";
import { useNavigate } from "react-router";

const AddEvent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.events);
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [bannerImage, setBannerImage] = useState(null);

  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !date || !time || !location || !bannerImage) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("bannerImage", bannerImage);

    dispatch(createEvent(formData))
      .unwrap()
      .then(() => {
        setName("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setBannerImage(null);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert("Failed to create event: " + err);
      });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-screen-md mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">Add Event</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-transparent"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded bg-transparent"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded bg-transparent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded bg-transparent"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-transparent"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {bannerImage && (
                <p className="mt-2 text-sm text-white">
                  Selected file: {bannerImage.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50">
              {loading ? "Creating..." : "Create Event"}
            </button>

            {error && <p className="text-red-600 mt-2">{error}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddEvent;
