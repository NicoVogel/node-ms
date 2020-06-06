import * as express from 'express';
import * as TeamController from '../controller/team.controller'
const TeamRouter = express.Router();

TeamRouter.post('/authenticate', TeamController.authenticate);
TeamRouter.post('/register', TeamController.register);
TeamRouter.get('/current', TeamController.getCurrent);
TeamRouter.get('/:id', TeamController.getById);
TeamRouter.delete('/:id', TeamController._delete);
TeamRouter.put('/:id', TeamController.update);
TeamRouter.get('/', TeamController.getAll);
export default TeamRouter;