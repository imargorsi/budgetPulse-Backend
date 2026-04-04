var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

 /**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/api/auth/register", userController.createUser);



module.exports = router;