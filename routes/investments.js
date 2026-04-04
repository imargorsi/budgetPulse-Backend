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


module.exports = router;