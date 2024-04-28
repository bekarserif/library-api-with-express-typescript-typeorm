import Joi from 'joi';

const createBookDto = Joi.object({
  name: Joi.string().required(),
});

export { createBookDto };
