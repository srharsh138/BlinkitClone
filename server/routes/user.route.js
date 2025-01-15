import  {Router} from 'express';
import { registerUserController } from '../cotroller/user.controller';

const userRouter=Router();
userRouter.post('/register',registerUserController);

export default userRouter;