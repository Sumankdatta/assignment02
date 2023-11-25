import { Model } from 'mongoose';

export type userName = {
  firstName: string;
  lastName: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  userName: string;
  password: string;
  fullName: userName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: UserAddress;
  orders?: Order[];
  // deletedCount: number;
};

export interface UserInterfaceModel extends Model<User> {
  isUserExists(userId: number): Promise<User | null>;
  updateSingleUser(userId: number): Promise<User | null>;
  deleteSingleUser(userId: number): Promise<User | null>;
}
