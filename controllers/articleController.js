import asyncHandler from 'express-async-handler'
import { responseBody, responseBodyList } from '../helpers/responseBodyHelpers.js'
import Article from '../models/Article.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import { Op } from 'sequelize'

// @desc    Create new article
// @route   POST /api/articles/create
// @access  private
const createArticle = asyncHandler(async (req, res) => {
    const { title, shortDescription, description, categoryId } = req.body

    const article = await Article.create({ 
        title, 
        shortDescription, 
        description,
        categoryId,
        authorId: req.user.id
    })

    if (article) {
        responseBody(res, article, 'Create Article Success')
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc    Get all articles
// @route   GET /api/articles
// @access  public
const getArticles = asyncHandler(async (req, res) => {
    const { page = 1, size = 10, search = '' } = req.query;
    
    const limit  = size
    const offset = (page - 1) * limit;

    const article = await Article.findAndCountAll({
        where: {
            title: { [Op.iLike]: '%' + search + '%' }
        },
        limit,
        offset,
        include: [{
            model: User,
            as: 'author',
            required: true,       
            attributes: ['id', 'name', 'email']
        }, {
            model: Category,
            required: true,       
            attributes: ['title']
        }]
    })
    if (article) {
        responseBodyList(res, req, article, 'Get Articles Success')
    } else {
        res.status(400)
        throw new Error('Not Found')
    }
})

// @desc    Get article by id
// @route   GET /api/article/:id
// @access  public
const getArticleById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const article = await Article.findOne({ where: {id},
        include: [{
            model: User,
            as: 'author',
            required: true,       
            attributes: ['id', 'name', 'email']
        }, {
            model: Category,
            required: true,       
            attributes: ['title']
        }]
    })
    if (article) {
        responseBody(res, article, 'Get Article Success')
     } else {
        res.status(400)
        throw new Error('Not Found')
     }
})

export { 
    createArticle,
    getArticles,
    getArticleById
}