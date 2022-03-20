import asyncHandler from 'express-async-handler'
import { responseBody } from '../helpers/responseBodyHelpers.js'
import Category from '../models/Category.js'

// @desc    Create new category
// @route   POST /api/auth/register
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

const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
}

export { 
    createCategory
}