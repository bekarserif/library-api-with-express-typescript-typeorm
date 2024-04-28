import Joi from 'joi';

const returnBookDto = Joi.object({
  score: Joi.number().required(),
});

export { returnBookDto };
