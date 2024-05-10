### Project Overview

This project is a web application for managing lectures, courses, and users. It consists of frontend and backend components built with React.js for the frontend and Node.js with Express.js for the backend.

### Frontend

The frontend is built using React.js and includes the following components:

- **Dashboard Page**: Displays upcoming lectures, including course name, instructor name, date, batch, and level.
- **Login Page**: Allows users to log in with their email and password.
- **Register Page**: Allows new users to register with their email, username, password, and role (admin or instructor).
- **Admin Panel**: Provides functionality for admin users to manage lectures and courses.
- **Instructor Panel**: Allows instructor users to view their assigned lectures.

### Backend

The backend is built with Node.js and Express.js and provides the following functionalities:

- **User Authentication**: Supports user registration and login with email and password.
- **Role-based Access Control**: Determines access to certain routes based on user roles (admin or instructor).
- **CRUD Operations**: Allows CRUD operations for lectures and courses.
- **Token-based Authentication**: Uses JWT tokens for authentication and authorization.

### API Endpoints

- **/api/users/register**: Register a new user with email, username, password, and role.
- **/api/users/login**: Authenticate user with email and password and issue JWT token.
- **/api/users/admin**: Get all admin users.
- **/api/users/instructor**: Get all instructor users.
- **/api/lectures**: Get all lectures, create new lectures.
- **/api/courses**: Get all courses, create new courses.


### Getting Started

1. Clone the repository.
2. Install dependencies for both frontend and backend.
3. Start the backend server.
4. Start the frontend development server.

### Technologies Used

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

### Contributors

- Abhishek Ojha
