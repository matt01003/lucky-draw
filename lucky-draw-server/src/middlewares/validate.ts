import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { ZodError, ZodTypeAny } from "zod"

type SchemaType = {
  body?: ZodTypeAny
  params?: ZodTypeAny
  query?: ZodTypeAny
}

export const validate = (schemas: SchemaType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) req.body = schemas.body.parse(req.body)
      if (schemas.params) req.params = schemas.params.parse(req.params)
      if (schemas.query) req.query = schemas.query.parse(req.query)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: "Validation failed",
          errors: error.errors,
        })
      } else {
        next(error)
      }
    }
  }
}
