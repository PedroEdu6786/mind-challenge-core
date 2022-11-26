import Joi from 'joi'

export const UserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  englishLevel: Joi.string().allow(''),
  skills: Joi.string().allow(''),
  cvLink: Joi.string().allow(''),
  isAdmin: Joi.boolean(),
})
