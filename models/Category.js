import { Sequelize } from 'sequelize'
import db from '../config/database.js'

const Category = db.define('category', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export default Category