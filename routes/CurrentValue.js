var express = require("express");
var router = express.Router();
const currentValueController = require("../controller/currentValueController");
const authMiddleware = require('../middleware/auth');

 /**
 * @swagger
 * /api/current-value:
 *   post:
 *     summary: Post Current Value to compute portfolio Summary
 *     tags: [CurrentValues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CurrentValue'
 *     responses:
 *       201:
 *         description: Current value Posted successfully and portfolio summary computed successfully
 */
router.post("/api/current-value", authMiddleware, currentValueController.postCurrentValue);



module.exports = router;