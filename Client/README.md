<!-- @format -->

# Event Management Dashboard

Frontend Live URL: https://fatmonk-event.vercel.app/

A modern full-stack Event Management Dashboard that allows users to create, view, update, and delete events with authentication support. Built using React for the frontend, Redux Toolkit for state management, and Node.js for the backend API.

## Features

- 🔐 Authentication (JWT-based, with token-protected routes)
- 📅 Event CRUD Operations (Create, Read, Update, Delete)
- 📦 Async Redux with createAsyncThunk
- 🧾 Form-data support for uploading media (e.g., event images)
- 🧭 Navigation using React Router
- 💅 Responsive UI with Tailwind CSS
- 🔁 Persistent state management with Redux
- 🌐 Hosted backend: fatmonk-event.onrender.com

## 🚀 Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: Simplifies Redux state management.
- **React Router DOM**: Enables dynamic routing.
- **Tailwind CSS**: A utility-first CSS framework.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

### Backend

- **Node.js / Express**: Server-side JavaScript environment and web application framework.
- **MongoDB**: NoSQL database for storing data.
- **JWT for Auth**: JSON Web Tokens for secure authentication.
- **Render for Deployment**: Platform for hosting web applications.

🛠️ Folder Structure (Frontend)

```bash
src/
│
├── components/ # Reusable UI components (Header, Footer, EventComponent)
├── features/
│   └── events/ # Redux slice, async thunks for Events
├── pages/
│   └── Dashboard.jsx # Main dashboard displaying all events
├── App.jsx # Main routing setup
├── store.js # Redux store configuration
```

- **Components**: Reusable UI elements (Header, Footer, EventComponent)
- **Features**: Redux slice, async thunks for Events
- **Pages**: Dashboard.jsx (main dashboard displaying all events)
- **App.jsx**: Main routing setup
- **store.js**: Redux store configuration
- **index.js**: Entry point

Frontend Key Files

1. **Dashboard.jsx**
   Displays all events.

   Fetches data using useEffect + Redux.

   Allows navigation to event details page.

   Includes “Add Event” link.

2. **eventSlice.js**
   Manages:

   - fetchEvents, fetchEventById

   - createEvent, updateEvent, deleteEvent

   - Async state (loading, error)

   - Event owner fetching (getUser)

3. **EventComponent.jsx**
   A reusable card that displays individual event information.

Backend API Endpoints (Sample)

- **GET /api/events**: Get all events
- **GET /api/events/:id**: Get event by ID
- **POST /api/events**: Create new event (form-data)
- **PUT /api/events/:id**: Update event
- **DELETE /api/events/:id**: Delete event
- **POST /api/auth/getuser/:id**: Get event creator

How to Run Locally

1. Clone the repo:

Professional MERN Stack & WordPress Developer
