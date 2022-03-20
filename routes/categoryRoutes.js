import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js'

const router = express.Router()

router.route('/')
    .get(getCategories)

router.route('/create')
    .post(protect, createCategory)

router.route('/:id')
    .get(getCategoryById)

export default router