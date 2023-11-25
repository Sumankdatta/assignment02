import { User } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const deleteUser = await UserModel.deleteOne({ userId });
  return deleteUser;
};

const updateSingleUserFromDb = async (userId: number, updates: User) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $set: updates },
    { new: true, runValidators: true },
  );

  return updatedUser;
};

const putUserOrderFromDb = async (userId: number, orderData: User) => {
  const existingOrder = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $addToSet: { orders: orderData } },
    { new: true, runValidators: true },
  ).select(['orders', '-_id']);

  return existingOrder;
};

const getUserOrderFromDb = async (userId: number) => {
  const existingOrder = await UserModel.findOne({ userId: userId }).select([
    'orders',
    '-_id',
  ]);

  return existingOrder;
};
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
