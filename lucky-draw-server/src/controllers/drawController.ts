import { Request, Response } from "express"
import DrawService from "../services/drawService"
import { ApiResponse } from "../../../shared/types/apiResponse"
import { Draw } from "../../../shared/schema/drawSchema"
import { BaseController } from "./baseController"
import { StatusCodes } from "http-status-codes"

class DrawController extends BaseController {
  private drawService: DrawService
  constructor(drawService: DrawService) {
    super()
    this.drawService = drawService
  }

  getCurrentDraw = async (req: Request, res: Response): Promise<void> => {
    try {
      const draw: Draw = await this.drawService.getCurrentDraw()
      const response: ApiResponse<Draw> = {
        success: true,
        data: draw,
      }
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      this.handleError(res, error)
    }
  }
}

export default DrawController
