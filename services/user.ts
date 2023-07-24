import { User as UserModel } from "../models";
import { UserInterface } from "../interfaces/user.interfaces";
import { UserWithPasswordValidation } from "../interfaces/user.interfaces";

const createUser = async (userData: UserInterface) => {
  try {
    let createdUser = new UserModel(userData);
    await createdUser.save();
  } catch (error) {
    throw error;
  }
};

const findByUsername = async (username: string) => {
  try {
    console.log("username   : ", username);

    let user: UserInterface | null;
    user = await UserModel.findOne({ username });
    return user;
  } catch (error) {
    throw error;
  }
};

const validateUserPassword = async (
  user: UserWithPasswordValidation,
  password: string
) => {
  try {
    const isValid = await user.validatePassword(password);
    return isValid;
  } catch (error) {
    throw error;
  }
};

export { findByUsername, createUser, validateUserPassword };
