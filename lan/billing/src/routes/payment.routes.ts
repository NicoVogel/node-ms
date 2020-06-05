import * as express from 'express';
import * as PaymentController from '../controller/payment.controller'
const PaymentRouter = express.Router();

PaymentRouter.post('/request', PaymentController.add);
PaymentRouter.get('/:accountId/:eventId', PaymentController.getById);
// PaymentRouter.put('/:id', PaymentController.update);
PaymentRouter.get('/', PaymentController.getAll);
PaymentRouter.get('/test', PaymentController.test);
export default PaymentRouter;