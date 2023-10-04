import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
//Services
import DeliveryManService from "../services/deliveryMan.services";
import { Responses } from "../services/responses";
const deliveryManServices = DeliveryManService.getInstance();
const responses = new Responses();

export const take_package = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const packagesId = req.body;
      const deliveryManId = req.user.deliveryManInfo?.toString() || "";

      for (let i = 0; i < packagesId.length; i++) {
        await deliveryManServices.takePackage(packagesId[i], deliveryManId);
      }

      responses.success(res, "package taked succesfully", 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);
export const mark_delivered = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const {packageId} = req.body;
      
      const deliveryManId = req.user.deliveryManInfo?.toString() || "";
      
      await deliveryManServices.markDelivered(
        deliveryManId,
        packageId
        );
        console.log('desp del await');
      responses.success(res, "Package marked as delivered", 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

export const get_taked_packages = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const deliveryManId = req.user.deliveryManInfo?.toString() || "";

      const takedPackages = await deliveryManServices.getTakedPackages(
        deliveryManId
      );
      responses.sendPackage(res, takedPackages, 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

export const untake_package = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const deliveryManId = req.user.deliveryManInfo?.toString() || "";
      const { packageId } = req.params;
      await deliveryManServices.untakePackage(deliveryManId, packageId);
      responses.success(res, "package untaked succesfully", 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

// export const untake_all_package = asyncHandler(
//   async (req: Request, res: Response) => {
//     try {
//       const deliveryManId = req.user.deliveryManInfo?.toString() || "";
//       const { packageId } = req.params;
//       await deliveryManServices.untakeAllPackage(deliveryManId, packageId);
//       responses.success(res, "package untaked succesfully", 200);
//     } catch (error) {
//       responses.error(res, error, 500);
//     }
//   }
// );
