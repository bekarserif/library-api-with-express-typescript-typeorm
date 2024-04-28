import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { MessageResponse } from './dto';
import { RequestValidators } from './interfaces';

export function validateRequest(validators: RequestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.validateAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.validateAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.validateAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(422);
      }
      next(error);
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<MessageResponse>, next: NextFunction) {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
  });
}
