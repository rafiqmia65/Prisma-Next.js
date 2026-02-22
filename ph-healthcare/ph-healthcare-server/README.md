# 🏥 PH HealthCare Backend Project

A scalable and secure backend system for the PH HealthCare platform.  
This project is built to manage authentication, user roles, appointments, and healthcare-related services efficiently.

---

## 🚀 Live Project

🔗 Production URL: _[Add your deployed backend URL here]_  
🔗 Frontend URL: _[Add frontend URL if applicable]_

---

## 📄 Project Documentation

- 📘 **Project Requirement Document (PRD)**  
  https://find-saminravi99.notion.site/PH-HealthCare-Backend-Project-Requirements-Document-2f7c48b8ac8c80d1a3c0c9f0dca631d7

- 🗂 **Database ERD**  
  https://drive.google.com/file/d/114TgHqCKexwxputkVNKlYjJXRn_X4u-T/view?usp=sharing

- 🖊 **System Design (Excalidraw)**  
  https://excalidraw.com/#json=A4GhmCmfR2AEeEzgNoM0m,FEEGMXbnMKU41flqqiRVfw

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT / Better Auth**
- **Zod (Validation)**
- **CORS**
- **Vercel (Deployment)**

---

## 📌 Features

### 🔐 Authentication & Authorization

- Secure user registration and login
- Role-based access control (Admin, Doctor, Patient, etc.)
- Protected routes
- Session management

### 👤 User Management

- Create, update, delete users
- Role management
- Profile handling

### 📅 Appointment Management

- Book appointments
- Update appointment status
- Cancel appointments
- View appointment history

### 🏥 Healthcare Services

- Manage doctors
- Manage schedules
- Service filtering & pagination

### ⚙️ Core Functionalities

- CRUD operations
- Input validation
- Error handling middleware
- Global error handler
- Environment-based configuration

---

## 🗄 Database Design

The database schema is designed following proper normalization rules.

Main entities:

- User
- Doctor
- Patient
- Appointment
- Schedule
- Review (if applicable)

👉 Full ERD available in the link above.

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

````

### 2️⃣ Install dependencies

```bash
pnpm install
```

or

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
DATABASE_URL=
JWT_SECRET=
PORT=
NODE_ENV=
BETTER_AUTH_URL=
```

### 4️⃣ Run Prisma Migration

```bash
npx prisma migrate dev
```

### 5️⃣ Run the project

```bash
pnpm dev
```

---

## 🧪 API Testing

You can test APIs using:

- Postman
- Thunder Client
- Insomnia

---

## 📂 Project Structure

```
src/
 ├── app/
 ├── modules/
 │    ├── auth/
 │    ├── user/
 │    ├── doctor/
 │    ├── appointment/
 │
 ├── middlewares/
 ├── utils/
 ├── prisma/
 └── server.ts
```

---

## 🛡 Error Handling Strategy

- Centralized error handler
- Custom error class
- Proper HTTP status codes
- Validation error formatting

---

## 📊 Assignment Evaluation Coverage

✔ Core Functionality
✔ Role-Based Access
✔ CRUD Operations
✔ Error Handling
✔ Clean Architecture
✔ Proper Commit History

---

## 👨‍💻 Author

**Your Name**
PH Level-2 Backend Assignment

---

## 📜 License

This project is created for academic learning purposes.
````
