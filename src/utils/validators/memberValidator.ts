import Joi from 'joi'

export const MemberValidator = Joi.object({
  idUser: Joi.number().required(),
  idTeam: Joi.number().required()
})
