# Infinity | Project Management System

Infinity is a full-stack project management application designed to help teams organize projects, manage tasks, and collaborate efficiently. It provides role-based access control, custom authentication, drag-and-drop task management, and user administration through an intuitive and interactive interface.

## 🌐 Live Demo

[**Visit Live Application →**](https://pms-shama.vercel.app)

## 📸 Project Preview

<img src="https://i.ibb.co.com/Df9vynTg/pms.png" alt="homepage">

## 🚀 Technologies Used

The frontend is built using the following technologies:

- **Next.js 14** – React framework with App Router for building the application.
- **TypeScript** – Static typing for better code quality and maintainability.
- **React 18** – Building reusable and interactive UI components.
- **Redux Toolkit** – Centralized state management.
- **Tailwind CSS** – Utility-first styling and responsive layouts.
- **Material UI (MUI)** – Pre-built UI components and icons.
- **React Beautiful DnD** – Drag-and-drop functionality for projects and tasks.
- **Axios** – Handling HTTP requests and API communication.
- **React Hook Form** – Efficient form handling.
- **Yup** – Form validation and schema management.
- **JWT Decode** – Decoding JSON Web Tokens.
- **Moment.js** – Date and time formatting.
- **React Hot Toast** – Displaying notifications and feedback.
- **Next Themes** – Theme management.
- **React Icons & Emoji Mart** – Icons and emoji selection.

## ✨ Key Features

- **Custom Authentication:** Secure authentication system using JSON Web Tokens (JWT).
- **Email Verification:** Activate user accounts through email verification.
- **Role-Based Access Control:** Different permissions for Super Admin, Admin, and regular users.
- **User Management:** Super Admin can create, update, and delete user accounts.
- **Project Management:** Create, view, update, and delete projects.
- **Task Management:** Organize, assign, update, and delete tasks.
- **Drag & Drop:** Easily rearrange projects and move tasks between sections using drag-and-drop functionality.
- **Personal Task View:** Users can view and manage their assigned tasks.
- **Form Validation:** Validate user input using React Hook Form and Yup.
- **Reusable Components:** Maintainable and reusable UI components.
- **Responsive Interface:** User-friendly interface designed for different screen sizes.
- **Email Notifications:** Email communication handled through the backend using Nodemailer.

## 📦 Dependencies

The project uses the following major dependencies:

| Package               | Purpose                                 |
| --------------------- | --------------------------------------- |
| `next`                | React framework and application routing |
| `react`               | Building UI components                  |
| `react-dom`           | Rendering React components              |
| `typescript`          | Static type checking                    |
| `@reduxjs/toolkit`    | Redux state management                  |
| `react-redux`         | Connecting React with Redux             |
| `@mui/material`       | Material UI components                  |
| `@mui/icons-material` | Material UI icons                       |
| `@mui/lab`            | Additional Material UI components       |
| `@mui/x-data-grid`    | Data grid components                    |
| `@emotion/react`      | CSS-in-JS styling                       |
| `@emotion/styled`     | Styled components                       |
| `tailwindcss`         | Utility-first CSS framework             |
| `react-beautiful-dnd` | Drag-and-drop interactions              |
| `axios`               | HTTP requests                           |
| `react-hook-form`     | Form management                         |
| `@hookform/resolvers` | Form validation integration             |
| `yup`                 | Schema-based validation                 |
| `jwt-decode`          | JWT decoding                            |
| `moment`              | Date and time manipulation              |
| `next-themes`         | Theme management                        |
| `query-string`        | URL query string handling               |
| `react-hot-toast`     | Toast notifications                     |
| `react-icons`         | Icon library                            |
| `emoji-mart`          | Emoji picker                            |

### Development Dependencies

- `@types/node` – Node.js type definitions.
- `@types/react` – React type definitions.
- `@types/react-dom` – React DOM type definitions.
- `@types/emoji-mart` – Emoji Mart type definitions.
- `@types/react-beautiful-dnd` – Drag-and-drop type definitions.
- `eslint` – JavaScript and TypeScript linting.
- `eslint-config-next` – Next.js ESLint configuration.
- `postcss` – CSS processing.
- `autoprefixer` – CSS vendor prefixing.

## 💻 Getting Started

Follow these instructions to run the frontend application on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm or Yarn
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/abushamacd/PMS_Frontend.git
```

### 2. Navigate to the Project Directory

```bash
cd PMS_Frontend
```

### 3. Install Dependencies

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Replace the URL with your deployed backend API URL when connecting to the production backend.

**Note:** The backend application must be running and accessible for authentication and other API-dependent features to work.

### 5. Start the Development Server

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

The application will be available at:

```text
http://localhost:3000
```

### 6. Build for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

### 7. Run ESLint

To check the code for linting issues:

```bash
npm run lint
```

## 🛠️ Why These Technologies?

- **Next.js:** Selected for its powerful React-based architecture, App Router, and optimized application performance.
- **TypeScript:** Used to improve code reliability, catch errors during development, and make the codebase easier to maintain.
- **Redux Toolkit:** Provides centralized state management for authentication, projects, tasks, and other application data.
- **Tailwind CSS:** Helps create responsive layouts and maintain consistent styling efficiently.
- **Material UI:** Provides ready-to-use UI components and a consistent design system.
- **React Beautiful DnD:** Makes project and task organization intuitive through drag-and-drop interactions.
- **React Hook Form & Yup:** Simplify form handling and provide structured validation.
- **Axios:** Makes communication with the backend REST API straightforward.

## 🧩 Challenges & Solutions

During the development of Infinity, several technical challenges were addressed:

1. **Authentication & Authorization:** Implementing custom JWT-based authentication and handling different user roles required a structured approach to access control.

2. **Role-Based User Management:** Managing different permissions for Super Admin, Admin, and regular users required separating administrative actions from standard user functionality.

3. **Drag-and-Drop Functionality:** Implementing draggable projects and tasks required handling item positions, section changes, and synchronizing the updated order with the backend.

4. **Global State Management:** Managing authentication, project data, and task information across multiple components required centralized state management using Redux Toolkit.

5. **Form Validation:** Handling multiple forms with consistent validation was simplified using React Hook Form and Yup.

6. **API Integration:** Connecting the frontend with the backend REST API required proper request handling, authentication tokens, and error feedback.

7. **Reusable Component Architecture:** Building reusable components helped reduce code duplication and made the application easier to maintain.

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Developing applications with Next.js 14 and TypeScript.
- Implementing custom JWT authentication.
- Understanding role-based access control (RBAC).
- Managing complex application state with Redux Toolkit.
- Building interactive drag-and-drop interfaces.
- Integrating frontend applications with REST APIs.
- Implementing form validation using React Hook Form and Yup.
- Developing reusable and scalable UI components.
- Working with Material UI and Tailwind CSS together.
- Structuring a full-stack application with separate frontend and backend repositories.

## 🔗 Related Repositories & Links

- **Live Application:** https://pms-shama.vercel.app
- **Frontend Repository:** https://github.com/abushamacd/PMS_Frontend
- **Backend Repository:** https://github.com/abushamacd/PMS_Backend

## 👨‍💻 Author

**Abu Shama**

- GitHub: [@abushamacd](https://github.com/abushamacd)

---

⭐ If you find this project interesting, consider giving it a star!
