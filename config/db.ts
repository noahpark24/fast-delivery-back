import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const URL = process.env.URL!

const connectDB = async () => {
	try {
		await mongoose.connect(URL)
		console.log('DB is connected')
	} catch (error) {
		console.error('Error connecting to database:', error)
	}
}
export default connectDB
