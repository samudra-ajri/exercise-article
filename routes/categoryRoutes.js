import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         title:
 *           type: string
 *           description: The category title
 *         createdAt:
 *           type: string
 *           description: The category created date
 *         updatedAt:
 *           type: string
 *           description: The category updated date
 *       example:
 *         id: "1"
 *         title: Title 1
 *         createdAt: 2022-03-21T01:55:52.848Z
 *         updatedAt: 2022-03-21T01:55:52.848Z
 */

/**
  * @swagger
  * tags:
  *   name: Category
  *   description: The article categories managing API
  */

/**
 * @swagger
 * /api/article-category:
 *   get:
 *     summary: Returns the article categories list
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Get Categories Success
 */
router.route('/')
    .get(getCategories)

/**
 * @swagger
 * /api/article-category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               title: Category 123
 *     responses:
 *       200:
 *         description: Create Category Success
 *       400:
 *         description: Invalid data
 *       409:
 *         description: Category already exists
 */
router.route('/create')
    .post(protect, createCategory)

/**
 * @swagger
 * /api/article-category/{id}:
 *   get:
 *     summary: Get the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The book id
 *     responses:
 *       200:
 *         description: Get Category Success
 *       404:
 *         description: Not Found
 */
router.route('/:id')
    .get(getCategoryById)

export default router