import * as express from 'express';
import * as UserController from '../controller/user.controller'
const UserRouter = express.Router();

UserRouter.post('/authenticate', UserController.authenticate);
UserRouter.post('/register', UserController.register);
UserRouter.get('/current', UserController.getCurrent);
UserRouter.get('/:id', UserController.getById);
UserRouter.delete('/:id', UserController._delete);
UserRouter.put('/:id', UserController.update);
UserRouter.get('/', UserController.getAll);
export default UserRouter;