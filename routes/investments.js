var express = require("express");
var router = express.Router();

const investmentController = require("../controller/investmentsController");

const authMiddleware = require('../middleware/auth');




/**
 * @swagger
 * /api/investments:
 *   get:
 *     summary: Get Investments by Fund
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: fundId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Fund ID to filter investments
 *     responses:
 *       200:
 *         description: List of investments
 */

router.get("/api/investments",  authMiddleware, investmentController.getAllInvestments);



/**
 * @swagger
 * /api/investments:
 *   post:
 *     summary: Post a new investment
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Investment'
 *     responses:
 *       201:
 *         description: Investment Posted successfully
 */
router.post("/api/investments", authMiddleware, investmentController.createInvestment);

/**
 * @swagger
 * /api/investments/{investmentId}:
 *   delete:
 *     summary: Delete an investment
 *     tags: [Investments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: investmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Investment ID to delete
 *     responses:
 *       200:
 *         description: Investment deleted successfully
 */
router.delete("/api/investments/:investmentId", authMiddleware, investmentController.deleteInvestment);


module.exports = router;