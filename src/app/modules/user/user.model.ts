import { Schema, model } from 'mongoose';
import {
  Order,
  User,
  UserAddress,
  UserInterfaceModel,
  userName,
} from './user.interface';
import isEmail from 'validator/lib/isEmail';
import config from '../../config';
import bcrypt from 'bcrypt';

const userNameSchema = new Schema<userName>({
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

const userAddressSchema = new Schema<UserAddress>({
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

const orderSchema = new Schema<Order>({
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

const userSchema = new Schema<User, UserInterfaceModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'Student id is required'],
  },
  username: {
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
      validator: (value: string) => isEmail(value),
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = model<User, UserInterfaceModel>('User', userSchema);
