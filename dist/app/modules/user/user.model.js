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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxLength: [20, 'First name can not be more then 20 character'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
});
const userAddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, 'street name is required'],
    },
    city: {
        type: String,
        required: [true, 'city name is required'],
    },
    country: {
        type: String,
        required: [true, 'Country name is required'],
    },
});
const orderSchema = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product name is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product name is required'],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        unique: true,
        required: [true, 'Student id is required'],
    },
    userName: {
        type: String,
        required: [true, 'User name is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        select: false,
    },
    fullName: {
        type: userNameSchema,
        required: [true, 'User full name is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value) => (0, isEmail_1.default)(value),
            message: 'Email is not valid',
        },
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: userAddressSchema,
    orders: [orderSchema],
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.salt_rounds));
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModel.findOne({ userId });
        return existingUser;
    });
};
userSchema.statics.deleteSingleUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteUser = yield exports.UserModel.deleteOne({ userId: userId });
        return deleteUser;
    });
};
// userSchema.statics.updateSingleUser = async function (
//   userId: number,
//   data: Partial<User>,
// ) {
//   console.log(userId);
//   // const updatedUser = await UserModel.updateOne(
//   //   // { userId: userId },
//   //   // { $set: data },
//   // );
//   const updatedUser = await UserModel.findOneAndUpdate(
//     { userId: userId },
//     {data},
//     { new: true, runValidators: true },
//   );
//   return updatedUser;
// };
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
