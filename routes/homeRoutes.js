import express from 'express'
import { home } from '../controllers/homeController.js'

const router = express.Router()

 /**
  * @swagger
  * tags:
  *   name: Home
  *   description: The home managing API
  */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the home info
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: SUCCESS
 */
router.route('/').get(home)

export default router