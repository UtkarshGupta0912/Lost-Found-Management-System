# Lost & Found Item Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing lost and found items on a college campus.

## Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Report Items**: Report lost or found items with detailed information
- **Search & Filter**: Search items by name/category and filter by Lost/Found type
- **CRUD Operations**: Create, Read, Update, and Delete items (owners only)
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Responsive Design**: Modern dark-themed UI that works on all devices

## Tech Stack

| Layer      | Technology                     |
|-----------|--------------------------------|
| Database   | MongoDB Atlas + Mongoose       |
| Backend    | Node.js + Express.js           |
| Auth       | bcryptjs + jsonwebtoken (JWT)  |
| Frontend   | React + React Router + Axios   |
| Styling    | Vanilla CSS (Dark Theme)       |

## Project Structure

```
Lost&FoundManagementSystem/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── middleware/auth.js         # JWT auth middleware
│   ├── models/User.js            # User schema
│   ├── models/Item.js            # Item schema
│   ├── controllers/authController.js
│   ├── controllers/itemController.js
│   ├── routes/authRoutes.js
│   ├── routes/itemRoutes.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── ItemForm.js
│   │   │   ├── ItemCard.js
│   │   │   └── PrivateRoute.js
│   │   ├── services/api.js
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── README.md
```

## API Endpoints

### Auth APIs
| Method | Endpoint          | Description      | Access  |
|--------|------------------|------------------|---------|
| POST   | `/api/register`   | Register user    | Public  |
| POST   | `/api/login`      | Login user       | Public  |

### Item APIs
| Method | Endpoint                    | Description       | Access   |
|--------|----------------------------|-------------------|----------|
| POST   | `/api/items`               | Add item          | Private  |
| GET    | `/api/items`               | Get all items     | Private  |
| GET    | `/api/items/search?name=`  | Search items      | Private  |
| GET    | `/api/items/:id`           | Get item by ID    | Private  |
| PUT    | `/api/items/:id`           | Update item       | Private  |
| DELETE | `/api/items/:id`           | Delete item       | Private  |

## MongoDB Schema

### User Schema
- `name` - String (required)
- `email` - String (required, unique)
- `password` - String (required, hashed with bcrypt)

### Item Schema
- `itemName` - String (required)
- `description` - String (required)
- `type` - String (enum: Lost/Found, required)
- `location` - String (required)
- `date` - Date (default: now)
- `contactInfo` - String (required)
- `user` - ObjectId (ref: User)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Deployment

- **Backend**: Deployed on Render (Web Service)
- **Frontend**: Deployed on Render (Static Site)

## Author

Utkarsh Gupta
