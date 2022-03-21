import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createArticle, getArticleById, getArticles } from '../controllers/articleController.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - shortDescription
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *           description: The article title
 *         shortDescription:
 *           type: string
 *           description: The article short description
 *         description:
 *           type: string
 *           description: The article description
 *         authorId:
 *           type: integer
 *           description: The article author
 *         categoryId:
 *           type: integer
 *           description: The article category
 *         createdAt:
 *           type: string
 *           description: The article created date
 *         updatedAt:
 *           type: string
 *           description: The article updated date
 *       example:
 *         id: "1"
 *         title: Title 1
 *         shortDescription: Article short description
 *         description: Article more description
 *         authorId: 1
 *         categoryId: 3
 *         createdAt: 2022-03-21T01:55:52.848Z
 *         updatedAt: 2022-03-21T01:55:52.848Z
 */

/**
  * @swagger
  * tags:
  *   name: Articles
  *   description: The articles managing API
  */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Returns the articles list
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Get Articles Success
 */
router.route('/')
    .get(getArticles)

/**
 * @swagger
 * /api/articles/create:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               title: Article 10
 *               shortDescription: short descripton Article 10
 *               description: detail descripton Article 10
 *               categoryId: 2
 *     responses:
 *       200:
 *         description: Create Article Success
 *       400:
 *         description: Invalid data
 */
router.route('/create')
    .post(protect, createArticle)

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The article id
 *     responses:
 *       200:
 *         description: Get Article Success
 *       404:
 *         description: Not Found
 */
router.route('/:id')
    .get(getArticleById)

export default router