import Joi from 'joi'

export const AccountValidator = Joi.object({
  accountName: Joi.string().required(),
  clientName: Joi.string().required(),
  headOfOperation: Joi.string().required(),
})
