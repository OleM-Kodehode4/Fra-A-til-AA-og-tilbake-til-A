# Fullstack Application Documentation

## Overview
This project is a fullstack application built using Node.js and Express for the backend and React for the frontend. It handles user registration, login, and profile editing, utilizing SQL Server for data storage. The application includes stored procedures and triggers for logging user actions.

## Project Structure
```
fullstack-app
├── backend
│   ├── src
│   │   ├── app.js                # Entry point for the backend application
│   │   ├── controllers           # Contains controller functions for handling requests
│   │   │   ├── authController.js  # Authentication-related functions
│   │   │   └── userController.js  # User management functions
│   │   ├── middleware            # Middleware for authentication and validation
│   │   │   └── authMiddleware.js  # Token validation and route protection
│   │   ├── models                # Database models
│   │   │   └── userModel.js      # User model with database interaction methods
│   │   ├── routes                # API routes
│   │   │   ├── authRoutes.js      # Routes for authentication
│   │   │   └── userRoutes.js      # Routes for user management
│   │   └── config                # Configuration files
│   │       └── db.js             # Database connection setup
│   ├── package.json              # Backend dependencies and scripts
│   ├── .env                      # Environment variables for configuration
│   └── README.md                 # Documentation for the backend
├── frontend
│   ├── public
│   │   └── index.html            # Main HTML file for the React application
│   ├── src
│   │   ├── components            # React components
│   │   │   ├── LoginForm.js       # Component for user login
│   │   │   ├── RegisterForm.js    # Component for user registration
│   │   │   └── ProfileEditor.js    # Component for editing user profiles
│   │   ├── pages                 # Page components
│   │   │   ├── LoginPage.js       # Page for login
│   │   │   ├── RegisterPage.js    # Page for registration
│   │   │   └── ProfilePage.js      # Page for user profile
│   │   ├── App.js                # Main component for routing
│   │   ├── index.js              # Entry point for the React application
│   │   └── services              # API service functions
│   │       └── api.js            # Functions for making API calls
│   ├── package.json              # Frontend dependencies and scripts
│   └── README.md                 # Documentation for the frontend
├── README.md                     # Main documentation for the project
└── sql
    ├── stored_procedures.sql     # SQL scripts for stored procedures
    └── triggers.sql              # SQL scripts for triggers
```

## Features
- User registration and login functionality
- Profile editing capabilities
- Secure authentication using tokens
- Logging of user actions through database triggers
- Organized structure with separate controllers, models, and routes

## Getting Started
1. Clone the repository.
2. Navigate to the `backend` directory and install dependencies:
   ```
   cd backend
   npm install
   ```
3. Create a `.env` file in the `backend` directory with your database configuration.
4. Start the backend server:
   ```
   npm start
   ```
5. Navigate to the `frontend` directory and install dependencies:
   ```
   cd frontend
   npm install
   ```
6. Start the frontend application:
   ```
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.