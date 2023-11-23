import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodSchema from './user.zod.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userZodSchema.parse(userData);
    const result = await UserServices.createUserIntoDb(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
};
