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
  const existingUser = await UserModel.isUserExists(userId);
  return existingUser;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const deleteUser = await UserModel.deleteSingleUser(userId);
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

// const putUserOrderFromDb = async (
//   userId: number,
//   orderData: Partial<Order>,
// ) => {
//   const orderGiven = await OrderModel.userOrder(userId, orderData);
//   return orderGiven;
// };

const putUserOrderFromDb = async (userId: number, orderData: User) => {
  const existingOrder = await UserModel.findOneAndUpdate(
    { userId: userId },
    { $addToSet: { orders: orderData } },
    { new: true, runValidators: true },
  ).select(['orders', '-_id']);

  return existingOrder;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserFromDb,
  putUserOrderFromDb,
};
