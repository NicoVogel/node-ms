import * as express from 'express';
import * as EventController from '../controller/event.controller';
const EventRouter = express.Router();

EventRouter.post('/', EventController.create);
EventRouter.get('/', EventController.getAll);
EventRouter.get('/:id', EventController.getById);
EventRouter.post('/register', EventController.register);

export default EventRouter;