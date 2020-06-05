import { Model } from 'mongoose';
import { Request, NextFunction, Response } from 'express';
import * as db from '../models';
const Payment = db.default.Payment;

export function requestPayment(req: Request, res: Response) {
  if (!req.body.userId) {
    res.status(400).send({ message: "Content can not be empty" });
  }
  const payment = new Payment(req.body);

  payment.save()
    .then(data => res.send(data.id))
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Error',
      });
    })
}
