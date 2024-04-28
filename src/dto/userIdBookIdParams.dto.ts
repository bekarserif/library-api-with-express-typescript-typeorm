import Joi from 'joi';

const userIdBookIdParams = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
});

export { userIdBookIdParams };
