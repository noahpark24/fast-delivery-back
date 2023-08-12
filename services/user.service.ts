import { User as UserModel } from '../models'
import { UserInterface } from '../interfaces/user.interfaces'
import { UserWithPasswordValidation } from '../interfaces/user.interfaces'

export default class User_Services {
	async createUser(userData: UserInterface) {
		try {
			const createdUser = new UserModel(userData)
			await createdUser.save()
		} catch (error) {
			throw error
		}
	}

	async findByUserEmail(email: string) {
		try {
			const user: UserWithPasswordValidation | null = await UserModel.findOne({
				email,
			})
			return user
		} catch (error) {
			throw error
		}
	}
	async validateUserPassword(
		user: UserWithPasswordValidation,
		password: string
	) {
		try {
			const isValid = await user.validatePassword(password)

			return isValid
		} catch (error) {
			throw error
		}
	}
}
