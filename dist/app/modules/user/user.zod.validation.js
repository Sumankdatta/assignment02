"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userName = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(2).max(20),
});
const userAddress = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const userOrder = zod_1.z.object({
    productName: zod_1.z.string().min(1).max(20),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userZodSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: userName,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: userAddress,
    orders: zod_1.z.array(userOrder).optional(),
});
exports.default = userZodSchema;
