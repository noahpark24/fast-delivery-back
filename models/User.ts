import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const User = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'enter a username'],
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'enter an email'],
		unique: true,
		validate: [validator.isEmail, 'enter an valid email'],
	},
	password: {
		type: String,
		required: [true, 'enter a password'],
		validate: [
			(str) => {
				validator.isStrongPassword(str, {
					minLength: 8,
					minUppercase: 1,
					minSymbols: 0,
					minNumbers: 0,
					returnScore: false,
				})
			},
			'The password must have 8 characters and 1 capital letter',
		],
	},
	salt: {
		type: String,
	},
	is_deleted: {
		type: Boolean,
		default: false,
	},
	is_admin: {
		type: Boolean,
		default: false,
	},
})

User.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next()
	}
	const salt = bcrypt.genSaltSync(8)
	this.salt = salt
	return bcrypt.hash(this.password, this.salt).then((hash) => {
		this.password = hash
	})
})

User.methods.validatePassword = async function (password) {
	const hash = await bcrypt.hash(password, this.salt)
	const checking = hash === this.password
	return checking
}

module.exports = mongoose.model('User', User)
