import User_Services from '../../services/user.services'
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import UserModel from "../../models/User.model";
import mongoose from "mongoose";

describe("User_Services - createUser", () => {
  beforeAll(
    async () => await mongoose.connect("mongodb://localhost/fast-delivery-back")
  );

  afterAll(async () => await mongoose.disconnect());

  it("should create a new user", async () => {
    const newUserData: any = {
      email: "123@test.com",
      password: "Hola1234",
      name: "Jose",
      last_name: "Moya",
    };

    const userCreated: any = {
      email: newUserData.email,
      password: newUserData.password,
    };

    const userServices = new User_Services();

    try {
      await userServices.createUser(newUserData);

      const createdUser = await UserModel.findOne({ email: newUserData.email });

      expect(createdUser).toBeDefined();
      if (createdUser) {
        expect(createdUser.email).toBe(newUserData.email);
        expect(createdUser.name).toEqual(newUserData.name);
        expect(createdUser.last_name).toBe(newUserData.last_name);
      }
    } catch (error) {
      console.error(error);
    }
  });
});
