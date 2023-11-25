import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.put('/:userId/orders', userController.putUserOrder);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

export const userRoute = router;
