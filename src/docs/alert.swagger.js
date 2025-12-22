/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Fraud & system alerts
 */

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Get all alerts
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [low, medium, high, critical]
 *       - in: query
 *         name: resolved
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Alerts fetched successfully
 */