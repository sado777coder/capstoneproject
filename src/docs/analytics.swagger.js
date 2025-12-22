/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Transaction and system analytics
 */

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Get transaction summary analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction summary fetched successfully
 */

/**
 * @swagger
 * /transactions/trends:
 *   get:
 *     summary: Get transaction trends analytics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [credit, debit]
 *     responses:
 *       200:
 *         description: Transaction trends fetched successfully
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get analytics for a specific user
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User analytics fetched successfully
 */