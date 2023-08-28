import supertest from "supertest";
import * as UsersTest from "../controllers/user.controller";
// import * as UserService from "../services/user.service";
import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

const userTest = {
  email: "test@test.com",
  name: "Fulano",
  last_name: "Mengano",
  password: "2023@password",
};

const userPayload = {
  _id: userId,
  email: "test@test.com",
  name: "Fulano",
};

describe("create user", () => {
  describe("user registration", () => {
    beforeAll(async () => {
      await mongoose.connect("mongodb://mongodb/fast-delivery-back");
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    it("it should return a status 201", async () => {
      const createUserServiceMock = jest.spyOn(UsersTest, "signup");
      //ts-ignore
      const { statusCode, body } = await supertest(UsersTest.signup)
        .post("api/users/signup")
        .send(userTest);

      expect(statusCode).toBe(201);
      // expect(body).toEqual("user created succesfuly");
    });
  });
});
