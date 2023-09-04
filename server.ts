import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const server = express()

//middlewares
server.use(cors({ origin: 'http://localhost:3000', credentials: true }))
server.use(bodyParser.json())
server.use(express.json())
server.use(cookieParser())
server.use('/api', routes)

connectDB()
server.listen(3001, '0.0.0.0', () => {
	console.log('listening')
})

export default server