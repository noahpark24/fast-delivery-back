import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
//Services
import DeliveryManService from '../services/deliveryMan.services';
import { Responses } from '../services/responses';
const deliveryManServices = DeliveryManService.getInstance();
const responses = new Responses();

export const take_package = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { packageId } = req.params;
      const deliveryManId = req.user.deliveryManInfo?.toString() || '';
      await deliveryManServices.takePackage(packageId, deliveryManId);

      responses.success(res, 'package taked succesfully', 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

export const get_taked_packages = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const deliveryManId = req.user.deliveryManInfo?.toString() || '';

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
      const deliveryManId = req.user.deliveryManInfo?.toString() || '';
      const { packageId } = req.params;
      await deliveryManServices.untakePackage(deliveryManId, packageId);
      responses.success(res, 'package untaked succesfully', 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

export const mark_pacakge_as_delivered = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { packageId } = req.params;
      const deliveryManId = req.user.deliveryManInfo?.toString() || '';

      await deliveryManServices.markPackageAsDelivered(
        deliveryManId,
        packageId
      );
      responses.success(res, 'Package marked as delivered', 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);

export const get_all_deliverymans = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const result = await deliveryManServices.getAllDeliverymans();
      responses.sendDeliverymans(res, result, 200);
    } catch (error) {
      responses.error(res, error, 500);
    }
  }
);
