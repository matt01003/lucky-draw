import { Request, Response } from "express"
import RegistrationService from "../services/registrationService"
import { ApiResponse } from "../../../shared/types/apiResponse"
import {
  RegistrationBodyDto,
  RegistrationDto,
} from "../../../shared/schema/registrationSchema"
import { BaseController } from "./baseController"
import { StatusCodes } from "http-status-codes"

class RegistrationController extends BaseController {
  private registrationService: RegistrationService
  constructor(registrationService: RegistrationService) {
    super()
    this.registrationService = registrationService
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const { userId, drawId } = req.body as RegistrationBodyDto

    try {
      const registration = await this.registrationService.registerUser(
        drawId,
        userId
      )
      const response: ApiResponse<RegistrationDto> = {
        success: true,
        data: registration,
      }
      res.status(StatusCodes.OK).json(response)
    } catch (error: unknown) {
      this.handleError(res, error)
    }
  }
}

export default RegistrationController
