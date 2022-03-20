import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import homeRoutes from './routes/homeRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import connectDB from './config/database.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT
const ENV = process.env.APP_ENV

if (ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/', homeRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))
    