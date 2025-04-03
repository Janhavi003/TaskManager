# Task Management App 

A full-stack Task Management Application built with **React**, **Node.js**, **Express**, and **MongoDB**. Users can add, edit, delete, and mark tasks as completed.

## Features 
- User authentication (JWT-based)
- Create, update, delete tasks
- Task categorization (Work, Personal, Urgent)
- Dark mode support
- Responsive UI with Tailwind CSS

## Tech Stack
### Frontend:
- React.js
- Tailwind CSS
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for schema modeling)
- JWT authentication

## Installation

### Prerequisites
- Node.js & npm installed
- MongoDB installed & running

### Steps
#### Clone the repository:
```bash
git clone https://github.com/Janhavih003/TaskManager.git
cd task-manager
```

#### Install dependencies and Start the Application:
##### Frontend:
```bash
cd client
npm install
```

##### Backend:
```bash
cd server
npm install

```


The application will be available at `http://localhost:3000`

## API Routes
### **Authentication Routes**
| Method | Endpoint        | Description              |
|--------|---------------|--------------------------|
| POST   | `/api/auth`   | User login               |
| POST   | `/api/users`  | Register new user        |

### **Task Routes** (Protected)
| Method | Endpoint         | Description            |
|--------|----------------|------------------------|
| GET    | `/api/tasks`   | Get all user tasks     |
| POST   | `/api/tasks`   | Create a new task      |
| PUT    | `/api/tasks/:id` | Update a task         |
| DELETE | `/api/tasks/:id` | Delete a task         |

## Folder Structure
```
/task-manager
│-- frontend/   (React frontend)
│-- backend/   (Node.js backend)
│   │-- models/ (Mongoose schemas)
│   │-- routes/ (Express API routes)
│   │-- middleware/ (Auth middleware)
│-- README.md
```



