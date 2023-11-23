import { Schema, model } from 'mongoose';
import { User, UserAddress, userName } from './user.interface';
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

const userSchema = new Schema<User>({
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
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<User>('User', userSchema);
