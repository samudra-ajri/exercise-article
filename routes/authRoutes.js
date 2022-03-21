import express from 'express'
import { authUser, registerUser } from '../controllers/userController.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: string
 *           description: The user phone
 *         password:
 *           type: string
 *           description: The user password
 *         createdAt:
 *           type: string
 *           description: The user created date
 *         updatedAt:
 *           type: string
 *           description: The user updated date
 *       example:
 *         id: "1"
 *         name: user
 *         email: user@gmail.com
 *         phone: "081234567890"
 *         password: password
 *         createdAt: 2022-03-21T01:55:52.848Z
 *         updatedAt: 2022-03-21T01:55:52.848Z
 */

/**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The auth managing API
  */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: user
 *               email: user@gmail.com
 *               phone: "081234567890"
 *               password: passwords
 *     responses:
 *       200:
 *         description: Register Success
 *       400:
 *         description: Invalid user data
 *       409:
 *         description: Email already exists
 */
router.route('/register')
    .post(registerUser)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               email: user@gmail.com
 *               password: password
 *     responses:
 *       200:
 *         description: Login Success
 *       400:
 *         description: Invalid credential
 */
router.route('/login')
    .post(authUser)

export default router