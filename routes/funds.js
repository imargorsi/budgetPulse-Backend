var express = require("express");
var router = express.Router();
const fundsController = require("../controller/fundsController");



/**
 * @swagger
 * /api/funds:
 *   get:
 *     summary: Get all funds
 *     tags: [Funds]
 *     responses:
 *       200:
 *         description: List of funds
 */
router.get("/api/funds", fundsController.getAllFunds);


/**
 * @swagger
 * /api/funds:
 *   post:
 *     summary: Create a new und
 *     tags: [Funds]
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
router.post("/api/funds", fundsController.createFund);



module.exports = router;