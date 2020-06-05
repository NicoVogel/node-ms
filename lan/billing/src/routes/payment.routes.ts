import * as express from 'express';
import * as PaymentController from '../controller/payment.controller'
const PaymentRouter = express.Router();

PaymentRouter.post('/request', PaymentController.requestPayment);
// PaymentRouter.get('/:id', PaymentController.getById);
// PaymentRouter.put('/:id', PaymentController.update);
PaymentRouter.get('/', PaymentController.getAll);
export default PaymentRouter;