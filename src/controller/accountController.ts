import { Request, Response } from 'express'
import { accountService } from '../useCases/account'
import {
  createAccount,
  deleteAccountById,
  getAllAccounts,
  updateAccountById,
} from '../services/account/index'
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

export const makeGetAllAccounts = async (req: Request, res: Response) => {
  const getAccounts = accountService.makeGetAllAccounts(getAllAccounts)

  const account = await getAccounts()

  if (!account) {
    return res.status(404).json({ message: 'No accounts found' })
  }

  return res.status(200).send(account)
}

export const makeUpdateAccountById = async (req: Request, res: Response) => {
  const accountData = req.body
  const accountId: number = Number(req.params.id)

  const updateAccount = accountService.makeUpdateAccountById(updateAccountById)
  const data = await updateAccount(accountData, accountId)

  if (!data) {
    return res.status(404).json({ message: 'Account not found' })
  }

  return res.status(200).send(data)
}

export const makeDeleteAccountById = async (req: Request, res: Response) => {
  const accountId: number = Number(req.params.id)

  const deleteAccount = accountService.makeDeleteAccountById(deleteAccountById)
  const data = await deleteAccount(accountId)

  if (!data) {
    return res.status(404).json({ message: 'Account not found' })
  }

  return res.status(200).send(data)
}
