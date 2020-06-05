import * as express from 'express';
import * as PaymentController from '../controller/payment.controller'
const PaymentRouter = express.Router();

// PaymentRouter.get('/current', PaymentController.getCurrent);
// PaymentRouter.get('/:id', PaymentController.getById);
// PaymentRouter.put('/:id', PaymentController.update);
// PaymentRouter.get('/', PaymentController.getAll);
export default PaymentRouter;