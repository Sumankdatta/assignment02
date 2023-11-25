import { User } from './user.interface';
import { UserModel } from './user.model';

//Create a new user service

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

//Retrieve a list of all users service

const getAllUsersFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

//Retrieve a specific user by ID service

const getSingleUserFromDB = async (userId: number) => {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

//Update user information service

const updateSingleUserFromDb = async (userId: number, updates: User) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $set: updates },
    { new: true, runValidators: true },
  );

  return updatedUser;
};

//Delete a user service

const deleteSingleUserFromDB = async (userId: number) => {
  const deleteUser = await UserModel.deleteOne({ userId });
  return deleteUser;
};

//Add New Product in Order service

const putUserOrderFromDb = async (userId: number, orderData: User) => {
  const existingOrder = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $addToSet: { orders: orderData } },
    { new: true, runValidators: true },
  ).select(['orders', '-_id']);

  return existingOrder;
};

//Retrieve all orders for a specific user service

const getUserOrderFromDb = async (userId: number) => {
  const existingOrder = await UserModel.findOne({ userId: userId }).select([
    'orders',
    '-_id',
  ]);

  return existingOrder;
};

//Calculate Total Price of Orders for a Specific User service

const getTotalPriceOfUserOrderFromDb = async (userId: number) => {
  const existingOrder = await UserModel.findOne({ userId: userId });

  if (!existingOrder) {
    return 0;
  }

  const totalPrice = existingOrder.orders?.reduce(
    (sum, order) => sum + (order.price + order.quantity),
    0,
  );

  return totalPrice;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDb,
  putUserOrderFromDb,
  getUserOrderFromDb,
  getTotalPriceOfUserOrderFromDb,
};
