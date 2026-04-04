var express = require("express");
var router = express.Router();

const investmentController = require("../controller/investmentsController");



/**
 * @swagger
 * /api/investments:
 *   get:
 *     summary: Get all Investments
 *     tags: [Investments]
 *     responses:
 *       200:
 *         description: List of investments
 */

router.get("/api/investments", investmentController.getAllInvestments);



/**
 * @swagger
 * /api/investments:
 *   post:
 *     summary: Post a new investment
 *     tags: [Investments]
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
router.post("/api/investments", investmentController.createInvestment);


module.exports = router;