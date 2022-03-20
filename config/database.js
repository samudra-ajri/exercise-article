import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const connectDB = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

export default connectDB