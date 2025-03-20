# Fullstack Application

This is a fullstack application built with Node.js/Express for the backend and React for the frontend. It handles user registration, login, and profile editing, utilizing SQL Server for data storage.

## Features

- User registration
- User login
- Profile editing
- Secure authentication with JWT
- Stored procedures for database operations
- Triggers for logging changes in the database

## Getting Started

### Prerequisites

- Node.js
- npm
- SQL Server

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your database configuration:
   ```
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_SERVER=your_db_server
   DB_NAME=your_db_name
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm start
   ```

### Database Setup

1. Run the SQL scripts in `sql/stored_procedures.sql` to create the necessary stored procedures.
2. Run the SQL scripts in `sql/triggers.sql` to set up triggers for logging.

## Usage

- Access the frontend application at `http://localhost:3000`.
- Use the registration form to create a new account.
- Log in with your credentials to access the profile editing features.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.