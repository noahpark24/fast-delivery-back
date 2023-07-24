import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { UserWithPasswordValidation } from "../interfaces/user.interfaces";

const User = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "enter an email"],
    unique: true,
    validate: [validator.isEmail, "enter an valid email"],
  },
  password: {
    type: String,
    required: [true, "enter a password"],
    validate: [
      (str: string) => {
        validator.isStrongPassword(str, {
          minLength: 8,
          minUppercase: 1,
          minSymbols: 0,
          minNumbers: 0,
          returnScore: false,
        });
      },
      "The password must have 8 characters and 1 capital letter",
    ],
  },
  salt: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "enter yor name"],
  },
  last_name: {
    type: String,
    required: [true, "enter your lastname"],
  },
  profile_img: {
    type: String,
    default:
      "https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png",
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

User.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (typeof this.password !== "string") {
    return next(new Error("Password is missing or not a string."));
  }

  const salt: string = bcrypt.genSaltSync(8);
  this.salt = salt;
  return bcrypt.hash(this.password, this.salt).then((hash) => {
    this.password = hash;
  });
});

User.methods.validatePassword = async function (password: string) {
  const hash: string = await bcrypt.hash(password, this.salt);
  const checking: boolean = hash === this.password;
  return checking;
};
// const UserModel = mongoose.model("User", User);
const UserModel = mongoose.model<UserWithPasswordValidation>("User", User);

export default UserModel;
