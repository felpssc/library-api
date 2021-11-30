import joi from 'joi';

const CreateCategorySchema = joi.object({
  title: joi.string().required(),
});

export { CreateCategorySchema };
