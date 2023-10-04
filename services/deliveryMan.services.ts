import { Types } from "mongoose";
import DeliveryManModel from "../models/DeliveryMan.model";
import Package from "../models/Package.model";
import { PackagesServices } from "./packages.services";
const packages_service = PackagesServices.getInstance();

export default class DeliveryManService {
  private static instance: DeliveryManService | null = null;
  private constructor() {}
  static getInstance(): DeliveryManService {
    if (!DeliveryManService.instance) {
      DeliveryManService.instance = new DeliveryManService();
    }
    return DeliveryManService.instance;
  }

  async findDeliveryManById(deliverymanId: string) {
    try {
      const deliveryman = await DeliveryManModel.findById(deliverymanId);
      if (!deliveryman) {
        throw new Error("Deliveryman not found");
      }
      return deliveryman;
    } catch (error) {
      throw error;
    }
  }

  async takePackage(packageId: string, deliverymanId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);
      const pack = await packages_service.getPackage(packageId);
      const takedPackage = new Types.ObjectId(packageId);

      if (pack) {
        pack.quantity_taked = pack.quantity;
        pack.quantity = 0;
        await pack.save();
        if (deliveryman.current_deliveries < 10) {
          deliveryman.current_deliveries += pack.quantity_taked;
          deliveryman.packages.push(takedPackage);
        }
      } else {
        return "daily packages limit exceded";
      }
      await deliveryman.save();
    } catch (error) {
      throw error;
    }
  }

  async untakePackage(deliverymanId: string, packageId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);
      const pack = await packages_service.getPackage(packageId);
      const packageToDeleteId = new Types.ObjectId(packageId);
      const packageIndex = deliveryman.packages.indexOf(packageToDeleteId);

      if (packageIndex !== -1) {
        if (pack) {
          deliveryman.packages.splice(packageIndex, 1);
          pack.quantity = pack.quantity_taked;
          pack.quantity_taked = 0;
          await pack.save();

          if (deliveryman.current_deliveries > 0) {
            deliveryman.current_deliveries -= pack.quantity;
          }
        } else {
          return "daily packages limit exceded";
        }
        await deliveryman.save();
      } else {
        throw new Error("Package not found in deliveryman packages");
      }
    } catch (error) {
      throw error;
    }
  }

  async getTakedPackages(deliverymanId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);
      const packageIds = deliveryman.packages;
      const packagesData = await Package.find({ _id: { $in: packageIds } });

      if (packagesData.length > 0) {
        return packagesData;
      } else {
        throw new Error("No packages found");
      }
    } catch (error) {
      throw error;
    }
  }

  async markDelivered(deliverymanId: string, packageId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);
      console.log("desp de deli", deliveryman);
      const packageIndex = deliveryman.packages.findIndex(
        (pkg) => pkg.toString() === packageId
      );
      if (packageIndex !== -1) {
        const foundPackage = await Package.findById(packageId);
        if (foundPackage) {
          foundPackage.is_delivered = true;
          await foundPackage.save();
        } else {
          throw new Error("Package not found in the database");
        }
      } else {
        throw new Error("Package not found in deliveryman packages");
      }
    } catch (error) {
      throw error;
    }
  }
}
