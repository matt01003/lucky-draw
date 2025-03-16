import { Router } from "express"
import DrawController from "../controllers/drawController"

function createDrawRoutes(drawController: DrawController) {
  const router: Router = Router()

  router.get("/current", drawController.getCurrentDraw)
  return router
}

export default createDrawRoutes
