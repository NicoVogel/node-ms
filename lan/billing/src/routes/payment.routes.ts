import * as express from 'express';
import * as PaymentController from '../controller/payment.controller'
const PaymentRouter = express.Router();

PaymentRouter.get('/:accountId/:eventId', PaymentController.getById);
PaymentRouter.get('/:accountId', PaymentController.getAllFromAccount);
PaymentRouter.post('/pay', PaymentController.pay)
export default PaymentRouter;