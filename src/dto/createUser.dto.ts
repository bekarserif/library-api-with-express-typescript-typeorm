import Joi from 'joi';

const createUserDto = Joi.object({
  name: Joi.string().required(),
});

export { createUserDto };
