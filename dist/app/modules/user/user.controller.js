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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_zod_validation_1 = __importDefault(require("./user.zod.validation"));
const user_model_1 = require("./user.model");
//Create a new user:-
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParseData = user_zod_validation_1.default.parse(userData);
        const result = yield user_service_1.UserServices.createUserIntoDb(zodParseData);
        res.status(200).json({
            success: true,
            message: 'User is created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
//Retrieve a list of all users:-
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
//Retrieve a specific user by ID:-
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
//Update user information
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const updates = req.body;
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            const result = yield user_service_1.UserServices.updateSingleUserFromDb(userId, updates);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
//Delete a user
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            yield user_service_1.UserServices.deleteSingleUserFromDB(userId);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
});
//Add New Product in Order
const putUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orderData = req.body;
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            yield user_service_1.UserServices.putUserOrderFromDb(userId, orderData);
            res.status(200).json({
                success: true,
                message: 'Order created successfully!',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
//Retrieve all orders for a specific user
const getUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            const result = yield user_service_1.UserServices.getUserOrderFromDb(userId);
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
//Calculate Total Price of Orders for a Specific User
const getTotalPriceOfUserOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        if (yield user_model_1.UserModel.isUserExists(userId)) {
            const result = yield user_service_1.UserServices.getTotalPriceOfUserOrderFromDb(userId);
            res.status(200).json({
                success: true,
                message: 'Order fetched successfully!',
                data: { totalPrice: result },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'User not found',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
        });
    }
});
exports.userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    putUserOrder,
    getUserOrder,
    getTotalPriceOfUserOrder,
};
