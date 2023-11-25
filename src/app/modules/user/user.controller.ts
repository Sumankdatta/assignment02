import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userZodSchema from './user.zod.validation';
import { UserModel } from './user.model';

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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    // const { userId } = req.params;
    const userId: number = Number(req.params.userId);

    const result = await UserServices.getSingleUserFromDB(userId);
    if (!result) {
      res.status(200).json({
        success: false,
        message: 'User not found!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);

    if (await UserModel.isUserExists(userId)) {
      await UserServices.deleteSingleUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const updates = req.body;

    const result = await UserServices.updateSingleUserFromDb(userId, updates);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
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
const putUserOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);
    const orderData = req.body;
    if (await UserModel.isUserExists(userId)) {
      await UserServices.putUserOrderFromDb(userId, orderData);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // const result = await UserServices.putUserOrderFromDb(userId, orderData);

    // res.status(200).json({
    //   success: true,
    //   message: 'Order created successfully!',
    //   data: result,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);

    if (await UserModel.isUserExists(userId)) {
      const result = await UserServices.getUserOrderFromDb(userId);
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};
const getTotalPriceOfUserOrder = async (req: Request, res: Response) => {
  try {
    const userId: number = Number(req.params.userId);

    if (await UserModel.isUserExists(userId)) {
      const result = await UserServices.getTotalPriceOfUserOrderFromDb(userId);

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: { totalPrice: result },
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  putUserOrder,
  getUserOrder,
  getTotalPriceOfUserOrder,
};
