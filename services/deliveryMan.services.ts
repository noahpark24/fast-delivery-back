import { Types } from 'mongoose';
import DeliveryManModel from '../models/DeliveryMan.model';
import Package from '../models/Package.model';

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
        throw new Error('Deliveryman not found');
      }
      return deliveryman;
    } catch (error) {
      throw error;
    }
  }

  async takePackage(packageId: string, deliverymanId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);

      const takedPackage = new Types.ObjectId(packageId);

      deliveryman.packages.push(takedPackage);

      await deliveryman.save();
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
        throw new Error('No packages found');
      }
    } catch (error) {
      throw error;
    }
  }

  async untakePackage(deliverymanId: string, packageId: string) {
    try {
      const deliveryman = await this.findDeliveryManById(deliverymanId);

      const packageToDeleteId = new Types.ObjectId(packageId);

      const packageIndex = deliveryman.packages.indexOf(packageToDeleteId);

      if (packageIndex !== -1) {
        //desde el packageIndex elimino un elemento
        deliveryman.packages.splice(packageIndex, 1);
        await deliveryman.save();
      } else {
        throw new Error('Package not found in deliveryman packages');
      }
    } catch (error) {
      throw error;
    }
  }
}
