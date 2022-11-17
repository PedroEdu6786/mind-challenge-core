import Joi from 'joi'

export const UserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  englishLevel: Joi.string(),
  skills: Joi.string(),
  cvLink: Joi.string(),
  isAdmin: Joi.boolean(),
})
