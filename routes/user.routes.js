import { Router } from 'express';
import { getUser, getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.patch('/:id', authorize, updateUser);

userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;