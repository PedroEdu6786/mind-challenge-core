import Joi from 'joi'

export const LogsValidator = Joi.object({
  userId: Joi.number().required(),
  teamId: Joi.number().required(),
  status: Joi.string().required(),
})
