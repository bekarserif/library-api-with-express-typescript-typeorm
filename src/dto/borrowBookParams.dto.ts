import Joi from 'joi';

const borrowBookParams = Joi.object({
  userId: Joi.number().required(),
  bookId: Joi.number().required(),
});

export { borrowBookParams };
