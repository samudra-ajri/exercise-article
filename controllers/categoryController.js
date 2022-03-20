import asyncHandler from 'express-async-handler'
import { responseBody } from '../helpers/responseBodyHelpers.js'
import Category from '../models/Category.js'

// @desc    Create new category
// @route   POST /api/article-category
// @access  private
const createCategory = asyncHandler(async (req, res) => {
    const title = capitalize(req.body.title)

    const categoryExists = await Category.findOne({ where: { title } })
    if (categoryExists) {
        res.status(409)
        throw new Error('Category already exists')
    }

    const category = await Category.create({ title })
    if (category) {
       responseBody(res, category, 'Create Category Success')
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc    Get all categories
// @route   GET /api/article-category
// @access  public
const getCategories = asyncHandler(async (req, res) => {
    const category = await Category.findAll()
    if (category) {
        responseBody(res, category, 'Get Categories Success')
    } else {
        res.status(400)
        throw new Error('Not Found')
    }
})

// @desc    Get category by id
// @route   GET /api/article-category/:id
// @access  public
const getCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const category = await Category.findOne({ where: { id } })
    if (category) {
        responseBody(res, category, 'Get Category Success')
     } else {
        res.status(400)
        throw new Error('Not Found')
     }
})

const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export { 
    createCategory,
    getCategories,
    getCategoryById
}