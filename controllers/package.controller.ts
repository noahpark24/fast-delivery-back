import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { PackagesServices } from '../services/packages.services'
import { PackageInterface } from '../interfaces/package.interfaces'
import { Responses } from '../services/responses'

const packages_service = PackagesServices.getInstance()
const responses = new Responses()

const getAllPackages = asyncHandler(async (req: Request, res: Response) => {
	try {
		const allPackages = await packages_service.getPackages()
		responses.sendPackage(res, allPackages, 201)
		console.log(allPackages)
	} catch (error) {
		console.log('Error: ', error)
	}
})

const getOnePackage = asyncHandler(async (req: Request, res: Response) => {
	try {
		const id: string = req.params.id
		const getPackage = await packages_service.getPackage(id)
		responses.sendPackage(res, getPackage, 201)
	} catch (error) {
		console.log('Error: ', error)
	}
})

const createPackage = asyncHandler(async (req: Request, res: Response) => {
	const data: PackageInterface = req.body
	try {
		await packages_service.createPackage(data)
		responses.success(res, 'Package created successfully', 201)
	} catch (error) {
		console.log('Error: ', error)
	}
})

const deletePackageById = asyncHandler(async (req: Request, res: Response) => {
	const id: string = req.params.id
	try {
		await packages_service.deletePackage(id)
		responses.success(res, 'Package deleted successfully', 201)
	} catch (error) {
		console.log('Error: ', error)
	}
})

const editPackageById = asyncHandler(async (req: Request, res: Response) => {
	const id: string = req.params.id
	const updatedData = req.body
	try {
		await packages_service.editPackage(id, updatedData)
		responses.success(res, 'Package edited successfully', 201)
	} catch (error) {
		console.log('Error: ', error)
	}
})

export {
	getAllPackages,
	getOnePackage,
	createPackage,
	deletePackageById,
	editPackageById,
}
