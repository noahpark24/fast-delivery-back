import { Schema, model } from 'mongoose'

const DeliveryMan = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	max_deliveries_per_day: {
		type: Number,
		default: 10,
		min: 1,
		max: 10,
	},
	current_deliveries: {
		type: Number,
		default: 0,
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
})

const Repartidor = model('Deliveryman', DeliveryMan)

export default Repartidor
