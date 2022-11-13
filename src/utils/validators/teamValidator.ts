import Joi from 'joi'

export const TeamValidator = Joi.object({
  idAccount: Joi.number().required(),
})
