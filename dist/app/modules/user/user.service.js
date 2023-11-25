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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.UserModel.findOne({ userId });
    return existingUser;
});
// const getSingleUserFromDB = async (userId: number) => {
//   const existingUser = await UserModel.isUserExists(userId);
//   return existingUser;
// };
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield user_model_1.UserModel.deleteSingleUser(userId);
    return deleteUser;
});
const updateSingleUserFromDb = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, { $set: updates }, { new: true, runValidators: true });
    return updatedUser;
});
// const putUserOrderFromDb = async (
//   userId: number,
//   orderData: Partial<Order>,
// ) => {
//   const orderGiven = await OrderModel.userOrder(userId, orderData);
//   return orderGiven;
// };
const putUserOrderFromDb = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingOrder = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, { $addToSet: { orders: orderData } }, { new: true, runValidators: true }).select(['orders', '-_id']);
    return existingOrder;
});
const getUserOrderFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingOrder = yield user_model_1.UserModel.findOne({ userId: userId }).select([
        'orders',
        '-_id',
    ]);
    return existingOrder;
});
const getTotalPriceOfUserOrderFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existingOrder = yield user_model_1.UserModel.findOne({ userId: userId });
    if (!existingOrder) {
        return 0;
    }
    const totalPrice = (_a = existingOrder.orders) === null || _a === void 0 ? void 0 : _a.reduce((sum, order) => sum + (order.price + order.quantity), 0);
    return totalPrice;
});
exports.UserServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
    updateSingleUserFromDb,
    putUserOrderFromDb,
    getUserOrderFromDb,
    getTotalPriceOfUserOrderFromDb,
};
