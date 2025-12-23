API Documentation
This project provides API documentation through Swagger (auto-generated) and a Postman collection for testing.
1. Swagger (Live API Docs)
The Swagger UI provides a web interface to explore all endpoints, see request/response schemas, and try out endpoints.
•	URL (Live on Render): https://capstoneproject-6-w38z.onrender.com/api/docs
•	Local Development:
Run the project locally and navigate to:
http://localhost:3002/api/docs
Swagger includes endpoints for:
•	Auth: User signup and login
•	Transactions: Create, read, update, delete
•	Alerts: View and manage alerts
•	Analytics: Transaction and user analytics
Some endpoints require a JWT token. Use the /users/login endpoint to obtain a token and click Authorize in Swagger.
________________________________________
2. Postman Collection
For testing endpoints in Postman:
•	Import the collection using this link:
https://sado777coder-4419533.postman.co/workspace/bfa808a6-e923-4217-869b-5243d41693eb/collection/49418763-487104d2-fffa-429a-a411-1a1eb38350b1?action=share&source=copy-link&creator=49418763
•	The collection includes pre-configured requests for:
o	Authentication (signup/login)
o	Transactions (CRUD)
o	Alerts (fetch, update, delete)
o	Analytics (summary, trends, user-specific)
•	Add your JWT token in the Postman Authorization tab for protected endpoints.
________________________________________
3. Quick Start
1.	Clone the repo:
2.	git clone https://github.com/sado777coder/capstoneproject.git
3.	cd capstoneproject
4.	Install dependencies:
5.	npm install
6.	Create a .env file with required variables:
7.	PORT=3002
8.	MONGODB_URL=<your-mongo-uri>
9.	JWT_SECRET=<your-secret>
10.	REDIS_URL=<optional-redis-url>
11.	Run the server locally:
12.	npm run dev
13.	Visit http://localhost:3002/api/docs to view Swagger, or use Postman with the collection link.
________________________________________
4. API Flow Diagram
flowchart LR
    A[User Auth] -->|JWT Token| B[Transactions]
    A -->|JWT Token| C[Alerts]
    A -->|JWT Token| D[Analytics]
    B --> C
    B --> D
    C --> D
Explanation:
•	User Auth: Signup or login to get a JWT token.
•	Transactions: Create, read, update, delete transactions (requires JWT).
•	Alerts: View and manage alerts (requires JWT).
•	Analytics: Fetch transaction summaries, trends, and user-specific analytics (requires JWT).
•	Arrows indicate which endpoints interact with others or require prior authorization.
________________________________________
5. Tips for Frontend Developers
•	Use Swagger for understanding endpoints: Quickly check required request parameters, response structures, and authentication requirements.
•	Use Postman for testing: Run requests, inspect responses, and copy request headers or payloads.
•	JWT Tokens: After login, copy the token from Postman or Swagger and include it in the Authorization header for all protected endpoints.
•	Environment Variables in Postman: Create a Local environment with variables like baseUrl and jwtToken to make switching between local and live servers seamless.
•	Testing order: Always authenticate first, then test transactions, alerts, and analytics endpoints.
