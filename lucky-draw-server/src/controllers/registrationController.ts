import { Request, Response } from "express"
import RegistrationService from "../services/registrationService"
import { ApiResponse } from "../../../shared/types/apiResponse"
import { Registration } from "../../../shared/types/registration"

class RegistrationController {
  private registrationService: RegistrationService
  constructor(registrationService: RegistrationService) {
    this.registrationService = registrationService
  }

  registerUser = async (req: Request, res: Response): Promise<void> => {
    const { userId, drawId } = req.body

    try {
      const registration = await this.registrationService.registerUser(
        drawId,
        userId
      )
      const response: ApiResponse<Registration> = {
        success: true,
        data: registration,
      }
      res.status(200).json(response)
    } catch (error: any) {
      const response = { success: false, error: error.message }
      res.status(400).json(response)
    }
  }
}

export default RegistrationController
