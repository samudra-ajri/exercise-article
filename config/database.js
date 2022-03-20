import { Sequelize } from 'sequelize'

const connectDB = async () => {
    try {
        const sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        })
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB