import Joi from 'joi'

export const TeamValidator = Joi.object({
  accountId: Joi.number().required(),
})
