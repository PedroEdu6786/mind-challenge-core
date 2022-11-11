import { NextFunction, Request, Response } from "express"

export const logRoute = (req: Request, res: Response, next: NextFunction) => {
  console.log(`ROUTE: ${req.path}`)
  next()
}
