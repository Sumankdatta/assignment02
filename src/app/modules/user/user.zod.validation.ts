import { z } from 'zod';

const userName = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(2).max(20),
});

const userAddress = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const userOrder = z.object({
  productName: z.string().min(1).max(20),
  price: z.number(),
  quantity: z.number(),
});

const userZodSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  password: z.string(),
  fullName: userName,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddress,
  orders: z.array(userOrder).optional(),
});

export default userZodSchema;
