/**
 * @swagger
 * tags:
 *   - name: Auth
 *   - name: Transactions
 *   - name: Budgets
 *   - name: Alerts
 *   - name: Analytics
 */

/**
 * =========================
 * AUTH
 * =========================
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * =========================
 * TRANSACTIONS
 * =========================
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Create a transaction
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction created successfully
 *               data:
 *                 _id: "69655848c68f68f72bbf7512"
 *                 amount: 200
 *                 currency: "GHS"
 *                 type: "debit"
 *                 category: "Food"
 *                 channel: "cash"
 *                 createdAt: "2026-01-12T20:23:37.004Z"
 *
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of transactions
 */

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transaction by ID
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Transaction found
 *
 *   put:
 *     tags: [Transactions]
 *     summary: Update transaction
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Transaction updated
 *
 *   delete:
 *     tags: [Transactions]
 *     summary: Delete transaction
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Transaction deleted
 */

/**
 * =========================
 * BUDGETS
 * =========================
 */

/**
 * @swagger
 * /budgets:
 *   post:
 *     tags: [Budgets]
 *     summary: Create monthly budget
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Budget'
 *     responses:
 *       201:
 *         description: Budget created
 *         content:
 *           application/json:
 *             example:
 *               message: Budget created successfully
 *               data:
 *                 month: "2026-01"
 *                 monthlyIncome: 3000
 *                 remainingBalance: 2800
 */

/**
 * =========================
 * ALERTS
 * =========================
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     tags: [Alerts]
 *     summary: Get all alerts
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Alerts list
 */

/**
 * @swagger
 * /alerts/{id}:
 *   put:
 *     tags: [Alerts]
 *     summary: Resolve or update alert
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Alert updated
 *
 *   delete:
 *     tags: [Alerts]
 *     summary: Delete alert
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Alert deleted
 */

/**
 * =========================
 * ANALYTICS
 * =========================
 */

/**
 * @swagger
 * /analytics/summary:
 *   get:
 *     tags: [Analytics]
 *     summary: Transaction summary
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Summary data
 *         content:
 *           application/json:
 *             example:
 *               totalIncome: 5000
 *               totalExpense: 2200
 *               balance: 2800
 */

/**
 * @swagger
 * /analytics/user:
 *   get:
 *     tags: [Analytics]
 *     summary: User analytics
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: User analytics
 */

/**
 * @swagger
 * /analytics/trends:
 *   get:
 *     tags: [Analytics]
 *     summary: Transaction trends
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Trend data
 */

/**
 * =========================
 * SCHEMAS
 * =========================
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required: [email, password]
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *     Transaction:
 *       type: object
 *       required: [amount, currency, type]
 *       properties:
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *         type:
 *           type: string
 *           enum: [credit, debit]
 *         category:
 *           type: string
 *         note:
 *           type: string
 *         channel:
 *           type: string
 *
 *     Budget:
 *       type: object
 *       required: [month, monthlyIncome]
 *       properties:
 *         month:
 *           type: string
 *         monthlyIncome:
 *           type: number
 *         remainingBalance:
 *           type: number
 */