import joi from 'joi';

const CreateBookSchema = joi.object({
  title: joi.string().required(),
  published_year: joi.number().integer().required(),
  author_id: joi.string().uuid().required(),
  category_id: joi.string().uuid().required(),
});

export { CreateBookSchema };
