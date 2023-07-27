import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { packages_services } from "../services/packages.services";
import { PackageInterface } from "../interfaces/package.interfaces";
import { Responses } from "../services/responses";

const packages_service = new packages_services();
const responses = new Responses()

const getAllPackages = asyncHandler(async (req: Request, res: Response) => {
  try {
   const allPackages = await packages_service.getPackages();
   responses.sendPackage(res, allPackages, 201)
console.log(allPackages);

  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});

const getOnePackage = asyncHandler(async (req: Request, res: Response) => {
  try {
    let id: string = req.params.id;
    
   const getPackage = await packages_service.getPackage(id);
    responses.sendPackage(res, getPackage, 201)
  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});

const createPackage = asyncHandler(async (req: Request, res: Response) => {
  const data: PackageInterface = req.body;
  try {
   await packages_service.createPackage(data);
    responses.success(res, "package created successfully", 201)
  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});

const deletePackageById = asyncHandler(async (req: Request, res: Response) => {
  let id: string = req.params.id;
 
  try {
    await packages_service.deletePackage(id);
    responses.success(res, "package deleted successfully", 201)
  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});
const editPackageById = asyncHandler(async (req: Request, res: Response) => {
  let id: string =req.params.id;
  let updatedData = req.body 

  try {
    await packages_service.editPackage(id, updatedData);
    responses.sendPackage(res, "package edited successfully", 201)
  } catch (error) {
    console.log("por esto moriii : ", error);
  }
});



export { getAllPackages, getOnePackage, createPackage, deletePackageById, editPackageById };
