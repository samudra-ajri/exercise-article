import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import db from './config/database.js'
import testDBConnection from './utils/testDBConnection.js'


import homeRoutes from './routes/homeRoutes.js'
import authRoutes from './routes/authRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

dotenv.config()
testDBConnection(db)

const app = express()
const PORT = process.env.PORT
const ENV = process.env.APP_ENV

if (ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: process.env.APP_URL,
			}
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use('/', homeRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/article-category', categoryRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))
    