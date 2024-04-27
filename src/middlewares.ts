import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
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
