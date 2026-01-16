API Documentation

This project provides a personal finance management API with authentication, transactions, budgets, alerts, and analytics.
API documentation is available via Swagger (auto-generated) and a Postman collection for testing.

1️. Swagger (Live API Docs)

Swagger UI provides an interactive interface to explore endpoints, view request/response schemas, and test APIs directly from the browser.

 URLs

Live (Render):
https://capstoneproject-6-w38z.onrender.com/api/docs

Local Development:
After running the project locally, open:

http://localhost:3002/api/docs

 Available API Modules

Swagger documents the following secured and public endpoints:

 Authentication

User registration (signup)

User login (JWT-based authentication)

 Transactions

Create transaction (debit / credit)

Fetch all user transactions (paginated)

Fetch a single transaction

Update a transaction

Delete a transaction

Debit transactions automatically update the user’s monthly budget and trigger alerts.

 Budgets

Create / initialize a monthly budget

Tracks:

Monthly income

Fixed expenses

Remaining balance

Automatically updated when debit transactions are created, updated, or deleted.

 Alerts

Auto-generated on transaction create/update/delete

Fetch all alerts (pagination + filters)

Fetch single alert

Update alert (resolve / acknowledge)

Delete alert (optional/admin)

 Analytics

Transaction summary (count, total, average)

User spending analytics (total spent, highest transaction)

Transaction trends (daily / monthly, optional date range)

 Authentication in Swagger

Most endpoints require a JWT token.

Steps:

Call /users/login

Copy the returned JWT

Click Authorize in Swagger

Paste token as:

Bearer <your_token>

2️. Postman Collection

A Postman collection is provided for manual testing and frontend integration.

 Collection Link

[https://sado777coder-4419533.postman.co/workspace/bfa808a6-e923-4217-869b-5243d41693eb/collection/49418763-487104d2-fffa-429a-a411-1a1eb38350b1?action=share&source=copy-link&creator=49418763](https://sado777coder-4419533.postman.co/workspace/Amos-Sottie's-Workspace~bfa808a6-e923-4217-869b-5243d41693eb/collection/49418763-f3ed3035-7b05-4c40-963f-2308902ad96c?action=share&source=copy-link&creator=49418763)

 Included Requests

Auth

Signup

Login

Transactions

Create

Get all (paginated)

Get single

Update

Delete

Budgets

Create monthly budget

Alerts

Get all (filters: severity, resolved)

Get single

Update (resolve)

Delete

Analytics

Summary

User analytics

Trends (daily / monthly)

 Authorization in Postman

For protected routes:

Set Authorization → Bearer Token

Paste the JWT from login response

 Tip: Create a Postman Environment with:

baseUrl = http://localhost:3002/api
jwtToken = <your_token>

3️. Quick Start (Local Setup)
 Clone Repository
git clone https://github.com/sado777coder/capstoneproject.git
cd capstoneproject

 Install Dependencies
npm install

 Environment Variables

Create a .env file in the root directory:

PORT=3002
MONGOOSE_URL=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

 Run the Server
npm run dev

 Access Docs

Swagger UI:
http://localhost:3002/api/docs

Swagger JSON:
http://localhost:3002/api/docs.json

4️. API Flow Diagram
flowchart LR
    A[User Auth] -->|JWT Token| B[Transactions]
    A -->|JWT Token| C[Budgets]
    A -->|JWT Token| D[Alerts]
    A -->|JWT Token| E[Analytics]

    B -->|Create / Update / Delete| D
    B -->|Debit| C
    C --> E
    B --> E

 Flow Explanation

Auth: User signs up or logs in to obtain a JWT.

Transactions:

Debit transactions reduce monthly budget balance.

Create alerts automatically.

Budgets:

One budget per user per month.

Tracks remaining balance in real time.

Alerts:

Linked to users and transactions.

Can be resolved or acknowledged.

Analytics:

Uses transaction data to generate summaries and trends.

5️. Notes for Frontend Developers

 Always authenticate first to obtain a JWT.

 Use Swagger to understand payloads, validation rules, and responses.

 Use Postman to test and debug before frontend integration.

 JWT Token must be included in:

Authorization: Bearer <token>


 Recommended order of testing:

Auth (signup/login)

Budget creation

Transactions

Alerts

Analytics
