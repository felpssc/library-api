import joi from 'joi';

const CreateAuthorSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
}).options({ stripUnknown: true });

const UpdateAuthorSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
}).options({ stripUnknown: true });

export { CreateAuthorSchema, UpdateAuthorSchema };
