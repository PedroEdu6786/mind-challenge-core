import { NextFunction, Request, Response } from 'express'

export const methodNotAllowed = (req: Request, res: Response) =>
  res.status(405).json({ message: 'Method not allowed' })

export const notFound = (req: Request, res: Response) => {
  res.status(404)
  throw new Error(`Route not found - ${req.originalUrl}`)
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
