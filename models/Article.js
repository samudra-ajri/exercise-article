import { Sequelize } from 'sequelize'
import db from '../config/database.js'
import Category from './Category.js'
import User from './User.js'

const Article = db.define('article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    shortDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Article.belongsTo(User, { as: 'author' })

Article.belongsTo(Category)

export default Article