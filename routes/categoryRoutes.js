import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createCategory } from '../controllers/categoryController.js'

const router = express.Router()

router.route('/create')
    .post(protect, createCategory)

export default router