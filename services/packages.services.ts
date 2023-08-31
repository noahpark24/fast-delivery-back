import { PackageInterface } from '../interfaces/package.interfaces'
import { Package } from '../models'

export class PackagesServices {
	private static instance: PackagesServices | null = null

	private constructor() {}

	static getInstance(): PackagesServices {
		if (!PackagesServices.instance) {
			PackagesServices.instance = new PackagesServices()
		}
		return PackagesServices.instance
	}

	async getPackages() {
		try {
			const allPackages = await Package.find()
			return allPackages
		} catch (error) {
			console.log('Error getting packages: ', error)
			throw error
		}
	}

	async getPackage(id: string) {
		try {
			const onePackage: PackageInterface | null = await Package.findById(id)
			return onePackage
		} catch (error) {
			console.log('Error getting package: ', error)
			throw error
		}
	}

	async createPackage(data: PackageInterface) {
		try {
			const newPackage = new Package(data)
			await newPackage.save()
			return newPackage
		} catch (error) {
			console.log('Error creating package: ', error)
			throw error
		}
	}

	async deletePackage(id: string) {
		try {
			const deletedPackage = await Package.findByIdAndRemove(id, {
				select: '_id',
			})
			if (deletedPackage) {
				console.log('Package removed')
			} else {
				console.log('Package not found')
			}
		} catch (error) {
			console.log('Error removing package: ', error)
			throw error
		}
	}

	async editPackage(id: string, updatedData: PackageInterface) {
		try {
			const updatedPackage = await Package.findByIdAndUpdate(id, updatedData)
			return updatedPackage
		} catch (error) {
			console.log('Error editing package: ', error)
			throw error
		}
	}
}
