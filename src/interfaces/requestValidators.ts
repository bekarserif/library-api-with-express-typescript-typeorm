import { AnySchema } from 'joi';

export interface RequestValidators {
  params?: AnySchema;
  body?: AnySchema;
  query?: AnySchema;
}
