import mongoose from 'mongoose'

const URL = 'mongodb://localhost/fast-delivery-back'

mongoose
	.connect(URL)
	.then(() => console.log('DB is connected'))
	.catch((error) => console.log(error))

export default mongoose
