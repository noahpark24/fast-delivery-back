import { User as UserModel } from '../models';
import { DeliveryMan } from '../models';
import { UserInterface } from '../interfaces/user.interfaces';
import { UserWithPasswordValidation } from '../interfaces/user.interfaces';

export default class User_Services {
  private static instance: User_Services | null = null;

  private constructor() {}

  static getInstance(): User_Services {
    if (!User_Services.instance) {
      User_Services.instance = new User_Services();
    }
    return User_Services.instance;
  }

  async createUser(userData: UserInterface) {
    try {
      const createdUser = await UserModel.create(userData);

      if (!createdUser.is_admin) {
        const newDeliveryMan = new DeliveryMan();

        await newDeliveryMan.save();

        createdUser.deliveryManInfo = newDeliveryMan._id;
      }
      await createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findByUserEmail(email: string) {
    try {
      const user: UserWithPasswordValidation | null = await UserModel.findOne({
        email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async validateUserPassword(
    user: UserWithPasswordValidation,
    password: string
  ) {
    try {
      const isValid = await user.validatePassword(password);

      return isValid;
    } catch (error) {
      throw error;
    }
  }

  async getDeliverymanId(userId: string) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (user.deliveryManInfo) {
        const deliveryMan = await DeliveryMan.findById(user.deliveryManInfo);
        if (deliveryMan) {
          return deliveryMan._id;
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
