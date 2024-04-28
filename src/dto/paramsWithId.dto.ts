import Joi from 'joi';

const paramsWithId = Joi.object({
  id: Joi.number().required(),
});

export { paramsWithId };
