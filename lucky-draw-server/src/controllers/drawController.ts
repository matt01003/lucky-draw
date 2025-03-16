import { Request, Response } from "express"
import DrawService from "../services/drawService"
import { Draw } from "../../../shared/types/draw"
import { ApiResponse } from "../../../shared/types/apiResponse"

class DrawController {
  private drawService: DrawService
  constructor(drawService: DrawService) {
    this.drawService = drawService
  }

  getCurrentDraw = async (req: Request, res: Response): Promise<void> => {
    try {
      const draw: Draw = await this.drawService.getCurrentDraw()
      const response: ApiResponse<Draw> = {
        success: true,
        data: draw,
      }
      res.json(response)
    } catch (error: any) {
      const response = { success: false, error: error.message }
      res.status(400).json(response)
    }
  }
}

export default DrawController
