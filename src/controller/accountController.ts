import { Request, Response } from 'express'
import { accountService } from '../services/account'
import { createAccount } from '../useCases/account'
import { AccountValidator } from '../utils/validators/accountValidator'

export const makeCreateAccount = async (req: Request, res: Response) => {
  const accountBody = req.body

  const { value, error } = await AccountValidator.validate(accountBody)

  if (error) {
    return res.status(400).json({ message: 'Invalid account data', error })
  }

  const makeAccount = accountService.makeCreateAccount(createAccount)

  const account = await makeAccount(value)

  if (!account) {
    return res.status(400).json({ message: 'Failed to create account' })
  }

  return res.status(201).send(account)
}
