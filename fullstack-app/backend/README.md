# Fullstack Application - Backend Documentation

## Overview
This backend application is built using Node.js and Express, providing RESTful APIs for user registration, login, and profile management. It connects to a SQL Server database and utilizes stored procedures for database operations.

## Features
- User registration
- User login with token-based authentication
- Profile editing
- Middleware for authentication
- Logging of database operations using triggers

## Getting Started

### Prerequisites
- Node.js
- SQL Server
- npm

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd fullstack-app/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the backend directory and add your database configuration:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_SERVER=your_db_server
   DB_NAME=your_db_name
   ```

### Running the Application
To start the backend server, run:
```
npm start
```
The server will run on `http://localhost:3000` by default.

## API Endpoints

### Authentication
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### User Management
- **GET /api/users/profile**: Get the authenticated user's profile.
- **PUT /api/users/profile**: Update the authenticated user's profile.

## Database
The application uses a SQL Server database. Stored procedures are defined for user registration, login, and profile updates. Triggers are implemented to log changes in the user data.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.