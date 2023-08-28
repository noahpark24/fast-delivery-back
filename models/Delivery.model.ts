import { Schema, model } from 'mongoose'

const DeliveryMan = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	current_deliveries: {
		type: Number,
		default: 0,
		max: 10,
	},
	active: {
		type: Boolean,
		default: false,
	},
	drinked_alcohol: {
		type: Boolean,
		default: false,
	},
	taked_drugs: {
		type: Boolean,
		default: false,
	},
	sleeped_well: {
		type: Boolean,
		default: true,
	},
	user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Repartidor = model('Deliveryman', DeliveryMan)

export default Repartidor