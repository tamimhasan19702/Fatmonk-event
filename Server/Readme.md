<!-- @format -->

# 🎉 Event Management REST API

A RESTful backend for managing events, built with **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. Users can register, login, create, update, delete, and filter events. Images can be uploaded via `multer`.

---

## 📁 Folder Structure

📦backend
├── 📁config
│ └── db.js # MongoDB connection setup
├── 📁controllers
│ ├── authController.js # Handles user registration and login
│ └── eventController.js # Handles CRUD operations for events
├── 📁middleware
│ ├── authMiddleware.js # Protects routes using JWT
│ ├── validators.js # Input validations using express-validator
├── 📁models
│ ├── User.js # User schema
│ └── Event.js # Event schema
├── 📁routes
│ ├── authRoutes.js # /api/auth
│ └── eventRoutes.js # /api/events
├── 📁uploads # Stores uploaded banner images
├── 📁utils
│ └── upload.js # Multer config for image uploads
├── .env # Environment variables
├── server.js # App entry point
└── package.json

yaml
Copy
Edit

---

## 🚀 Features

- ✅ User Registration & Login with JWT
- ✅ Protected Event Routes
- ✅ Create / Read / Update / Delete Events
- ✅ Image Upload via Multer
- ✅ Delete old image on update/delete
- ✅ Filter Events by query (name, date, location, etc.)

---

## 📦 Installation

git clone https://github.com/yourusername/event-api.git
cd event-api
npm install
🔐 Environment Variables
Create a .env file in the root:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
🧪 Running the Server
bash
Copy
Edit
npm run dev
🔌 API Endpoints
✅ Auth Routes /api/auth
Register User
http
Copy
Edit
POST /api/auth/register
Body (JSON):

json
Copy
Edit
{
"name": "John Doe",
"email": "john@example.com",
"password": "123456"
}
Login User
http
Copy
Edit
POST /api/auth/login
Body (JSON):

json
Copy
Edit
{
"email": "john@example.com",
"password": "123456"
}
📅 Event Routes /api/events (Protected)
Set Bearer Token in Authorization Header

Create Event
http
Copy
Edit
POST /api/events
Body (form-data):

eventName: string

description: string

date: YYYY-MM-DD

time: HH:MM

location: string

bannerImage: image file

Get All Events (with optional filters)
http
Copy
Edit
GET /api/events?location=New%20York&date=2025-05-01
Get Event by ID
http
Copy
Edit
GET /api/events/:id
Update Event
http
Copy
Edit
PUT /api/events/:id
Body (form-data): (include only fields to update)

eventName, description, date, time, location, bannerImage

Delete Event
http
Copy
Edit
DELETE /api/events/:id
🛠️ Technologies Used
Node.js

Express.js

MongoDB & Mongoose

JSON Web Token (JWT)

Multer (File upload)

express-validator

dotenv

nodemon

📌 Notes
Uploaded images are stored in uploads/ folder

On event update, if a new image is uploaded, the previous one is deleted

All event routes are protected using JWT

✅ Future Enhancements
Password reset via email

Event pagination and sorting

Admin role support

MongoDB GridFS for image storage

📧 Author
Tareq Monower
