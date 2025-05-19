/** @format */

const EventComponent = ({ event }) => {
  const { name, description, date, time, location, bannerImage } = event;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  console.log(bannerImage);

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* <img
        src={`https://fatmonk-event.onrender.com/${bannerImage.replace(
          /\\/g,
          "/"
        )}`}
        className="w-full h-48 object-cover"
        alt={name}
      /> */}

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>

        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>
            <span className="font-semibold">Date:</span> {formattedDate}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {time}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
