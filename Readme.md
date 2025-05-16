<!-- @format -->

## 🎉 Event Management Web App

This is a full-stack event management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to register, log in, create events with banner images, view a list of all events, update or delete their events. The backend handles user authentication using JWT, and event images are uploaded via Multer and saved in the server's filesystem.

The frontend is built with React and connects to the Express API using Axios. Users can interact with the platform to manage their events in a clean and responsive UI. Filtering, validation, protected routes, and image handling are all supported.

The project is organized into client/ for the React frontend and Server/ for the API. To run it, start both the Server (npm run dev in /Server) and the frontend (npm start in /client). Make sure to add a .env file for your Server with PORT, MONGO_URI, and JWT_SECRET. This project is great as a base for more advanced event management or booking systems.
