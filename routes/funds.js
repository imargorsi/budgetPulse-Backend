var express = require("express");
var router = express.Router();
const fundsController = require("../controller/fundsController");
const authMiddleware = require('../middleware/auth');



/**
 * @swagger
 * /api/funds:
 *   get:
 *     summary: Get all funds
 *     tags: [Funds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of funds
 */
router.get("/api/funds", authMiddleware, fundsController.getAllFunds);


/**
 * @swagger
 * /api/funds:
 *   post:
 *     summary: Create a new und
 *     tags: [Funds]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fund'
 *     responses:
 *       201:
 *         description: Fund created successfully
 */
router.post("/api/funds", authMiddleware, fundsController.createFund);

/**
 * @swagger
 * /api/funds/{fundId}:
 *   delete:
 *     summary: Delete a fund
 *     tags: [Funds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fundId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fund ID to delete
 *     responses:
 *       200:
 *         description: Fund deleted successfully
 *       409:
 *         description: Fund has linked investments and cannot be deleted
 */
router.delete("/api/funds/:fundId", authMiddleware, fundsController.deleteFund);



module.exports = router;