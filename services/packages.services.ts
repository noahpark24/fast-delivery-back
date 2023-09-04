import { PackageInterface } from '../interfaces/package.interfaces'
import { Package } from '../models'

export class packages_services {
	async getPackages() {
		try {
			const allPackages = await Package.find()
			return allPackages
		} catch (error) {
			console.log('Error getting packages: ', error)
			throw error
		}
	}

	async getPackage(id: any) {
		try {
			const onePackage:PackageInterface | null = await Package.findById(id)
			return onePackage
		} catch (error) {
			console.log('Error getting packages: ', error)
			throw error
		}
	}

	async createPackage(data: PackageInterface) {
		try {
			const newPackage = new Package(data);
			console.log('Creating a new package...', newPackage);
			await newPackage.save();
			
			console.log('Package created successfully.');
			return newPackage;
		} catch (error) {
			console.log('Error creating package: ', error);
			throw error;
		}
	}
	
	async deletePackage(id: any) {
		try {
			const deletedPackage = await Package.findByIdAndRemove(id, { select: '_id' })
			if (deletedPackage) {
				return console.log('package removed')
			} else {
				console.log('Package not found')
			}
		} catch (error) {
			console.log('Error removing package: ', error)
			throw error
		}
	}
  
	async editPackage(id:string, updatedData:PackageInterface) {
		try {
			const updatedPackage = await Package.findByIdAndUpdate(id, updatedData)
			return updatedPackage
		} catch (error) {
			console.log('Error editing package: ', error)
			throw error
		}
	}
}