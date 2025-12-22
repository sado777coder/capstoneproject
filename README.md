# Transaction & Fraud Alert API 

A production-ready backend API for managing user transactions, detecting fraud alerts, and providing analytics. Built as a capstone project with real-world architecture and best practices.

---

##  Live Demo
- **API Base URL:** https://capstoneproject-6-w38z.onrender.com/api
- **Swagger Docs:** https://capstoneproject-6-w38z.onrender.com/api/docs

---

##  Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Joi Validation**
- **Swagger / OpenAPI**
- **Render (Deployment)**

---

##  Authentication
Uses **JWT Bearer Token**

Authorization: Bearer <token>

yaml
Copy code

---

##  Features

###  Auth
- Register user
- Login user (JWT)

###  Transactions
- Create transaction
- Update / delete transaction
- View transactions
- Fraud detection triggers alerts

###  Alerts
- Large transaction detection
- View alerts (filter & paginate)
- Resolve alerts

###  Analytics
- Transaction summaries
- User analytics
- Transaction trends

---

##  API Documentation
All endpoints are documented using Swagger:

`/api/docs`

---

##  Environment Variables
Create a `.env` file:

```env
PORT=3002
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
 Run Locally
bash
Copy code
git clone https://github.com/sado777coder/capstoneproject.git
cd capstoneproject
npm install
npm run dev
 Deployment
Deployed on Render with MongoDB Atlas.

 Author
Amos Sottie
Backend Developer
