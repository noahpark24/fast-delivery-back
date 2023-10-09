"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validator_1 = __importDefault(require("validator"));
const User = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'enter an email'],
        unique: true,
        validate: [validator_1.default.isEmail, 'enter an valid email'],
    },
    password: {
        type: String,
        required: [true, 'enter a password'],
        validate: [
            (str) => {
                validator_1.default.isStrongPassword(str, {
                    minLength: 8,
                    minUppercase: 1,
                    minSymbols: 0,
                    minNumbers: 0,
                    returnScore: false,
                });
            },
            'The password must have 8 characters and 1 capital letter',
        ],
    },
    salt: {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'enter yor name'],
    },
    last_name: {
        type: String,
        required: [true, 'enter your lastname'],
    },
    profile_img: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png',
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    deliveryManInfo: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Deliveryman',
    },
});
User.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    if (typeof this.password !== 'string') {
        return next(new Error('Password is missing or not a string.'));
    }
    const salt = bcryptjs_1.default.genSaltSync();
    this.salt = salt;
    bcryptjs_1.default
        .hash(this.password, this.salt)
        .then((hash) => {
        this.password = hash;
        next();
    })
        .catch((err) => {
        next(err);
    });
});
User.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield bcryptjs_1.default.hash(password, this.salt);
        const checking = hash === this.password;
        return checking;
    });
};
// const UserModel = mongoose.model("User", User);
const UserModel = mongoose_1.default.model('User', User);
exports.default = UserModel;
