import mongoose, { Schema } from 'mongoose'
import { PackageInterface } from '../interfaces/package.interfaces'

const PackageSchema: Schema = new Schema({
	client: {
		type: String,
		required: [true, 'Please enter client name'],
	},
	destination: {
		type: String,
		required: [true, 'Please enter a destination for your package'],
	},
	creation_date: {
		type: Date,
		default: Date.now,
		required: [true, 'Please enter the creation date'],
	},
	is_delivered: {
		type: Boolean,
		default: false,
		required: [true, 'Please enter the package status'],
	},
	package_weight: {
		type: Number,
		default: 0,
		required: [true, 'Please enter the package weight'],
	},
	additional_information: {
		type: String,
		default: null,
	},
})

const Package = mongoose.model<PackageInterface>('Package', PackageSchema)

export default Package
