import { Response } from "express"
import { ApiResponse } from "../../../shared/types/apiResponse"
import { StatusCodes } from "http-status-codes"
import { AppError } from "../appErrors"

export class BaseController {
  protected handleError(res: Response, error: unknown): void {
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR

    const errorMessage =
      error instanceof AppError ? error.message : "internal server error"

    console.error(`Error:`, error)

    const response: ApiResponse<never> = {
      success: false,
      error: errorMessage,
    }

    res.status(statusCode).json(response)
  }
}
