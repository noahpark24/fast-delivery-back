import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
//routes
import routes from './routes/index'
//db
import connectDB from './config/db'
//swagger
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './docs/swagger'
import swaggerJSDoc from 'swagger-jsdoc'
const server = express()

//middlewares
server.use(cors({ origin: 'http://localhost:3000', credentials: true }))
server.use(bodyParser.json())
server.use(express.json())
server.use(cookieParser())
server.use('/api', routes)
//Swagger config
server.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerJSDoc(swaggerConfig))
)

connectDB()
server.listen(3001, '0.0.0.0', () => {
	console.log('listening')
})

export default server
