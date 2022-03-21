import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createArticle, getArticleById, getArticles } from '../controllers/articleController.js'

const router = express.Router()

router.route('/')
    .get(getArticles)

router.route('/create')
    .post(protect, createArticle)

router.route('/:id')
    .get(getArticleById)

export default router