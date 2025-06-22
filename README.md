# 🔐 MERN Stack Authentication

Welcome to the **MERN Stack Authentication** project! 🚀  
This is a full-stack authentication system built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It provides a secure and scalable solution for user registration, login, protected routes, and token-based authentication using **JSON Web Tokens (JWT)**.It provides **Verify Email** Functionality and **Reset Password** functionality with seamless **Otp Verification** process.

---

## 📖 Table of Contents

- [🔍 About](#-about)
- [🛠️ Tech Stack](#️-tech-stack)
- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [⚙️ Installation](#️-installation)
- [📌 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [✅ API Endpoints](#-api-endpoints)
- [📄 License](#-license)

---

## 🔍 About

This project demonstrates a modern, production-ready **authentication flow** for web applications using the MERN stack. It includes:

- User **registration & login**
- **Password hashing** with `bcrypt`
- **JWT-based** authentication & protected routes
- Securely handling tokens in **localStorage** and **Cookies**
- **Send Mail** Feature
- **Verify Email** and **Reset Password** functionality with **Otp Verification**
- React front-end with context-based authentication handling
- Seemless **State Management** and use of **Context Api**

---

## 🛠️ Tech Stack

**Frontend:**  
![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

**Backend:**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

**Database:**  
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**Authentication:**

- JSON Web Tokens (JWT)
- Bcrypt

---

## ✨ Features

✅ User Registration with hashed passwords  
✅ User Login with JWT authentication  
✅ Protected Routes accessible only to authenticated users  
✅ React frontend with Auth Context  
✅ Verify Email Functionality
✅ Reset Password Functionality
✅ Send Mail Functionality
✅ Otp Verification
✅ Logout and token removal
✅ Error handling and validation

---

## 📸 Screenshots

- Home Page
  ![Home Page](https://github.com/user-attachments/assets/b2e4d068-21b1-4fbe-9809-0e564a8e6dcb)
  
- Signup Page
  ![SignUp Page](https://github.com/user-attachments/assets/04c93d73-c258-424c-b295-3bf348e4b212)

- Signin Page
  ![SignIn Page](https://github.com/user-attachments/assets/5cc4dc24-4f4f-4dc7-a02c-c5394895cff6)

- verify Otp Page
  ![Verify Otp Page](https://github.com/user-attachments/assets/8e516839-dc23-4fc4-a67d-0f306b337eed)

- Reset Password flow
  ![Reset Passwrod Email Page](https://github.com/user-attachments/assets/f06bd391-52bc-401d-a284-3a6934d35fce)
  ![Reset Password Otp Page](https://github.com/user-attachments/assets/2a406f73-2ed3-4d1b-b5df-58374bc9143c)
  ![Enter New Password Page](https://github.com/user-attachments/assets/d76fbef4-b03e-4fd3-b331-6a9af1a0cdc9)

---

## ⚙️ Installation

Follow these steps to set up and run the project locally:

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in your `/backend` directory with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Get refrence of .env.example file

### 📦 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 Usage

1. Go to `http://localhost:3000`
2. Register a new user account.
3. Log in with your credentials.
4. Access protected pages when authenticated.
5. Log out to clear the token.

---

## 📂 Project Structure

```
MERN-Auth/
├── backend/
│   ├── public/
│   ├── src/
        ├── controllers/
        ├── db/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── services/
        ├── utils/
        ├── app.js
        ├── config.js
        └── index.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

---

Got it! Below is a sample **Deployment** section (in Markdown format) that you can include in your GitHub README. I've added placeholder URLs for both the frontend and backend deployments. Once you have the actual links, you can simply replace them.

---

### 🚀 Deployment

The project is live and accessible at the following URLs:

- 🌐 **Frontend**: [https://mernauthsys.vercel.app](https://mernauthsys.vercel.app)
- 🛠️ **Backend**: [https://api-mern-auth-system.onrender.com/api/v1](https://api-mern-auth-system.onrender.com/api/v1)

---

## ✅ API Endpoints

### 🔒 Authentication Routes (`/api/auth`)

| Method | Route          | Description             |
| :----- | :------------- | :---------------------- |
| `POST` | `/signup`      | Register new user       |
| `POST` | `/signin`      | Login and get JWT token |
| `GET`  | `/userdetails` | Access protected data   |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Contributing

Contributions are welcome! 🎉  
Feel free to open issues or submit pull requests.

---

## 📞 Contact

- 📧 Email: kunalbhalerao789@gmail.com
<!-- - 🌐 Portfolio: [yourportfolio.com](https://yourportfolio.com) -->
- 🐦 Twitter: [@KUNAL*BHALERAO*](https://x.com/KUNAL_BHALERAO_)
- i LinkedIn: [@kunalbhalerao](https://www.linkedin.com/in/kunalbhalerao/)

---

## ⭐️ Support

If you like this project, consider giving it a ⭐️ on GitHub! It helps a lot!

---
