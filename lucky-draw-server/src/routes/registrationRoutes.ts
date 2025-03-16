import { Router } from "express"
import RegistrationController from "../controllers/registrationController"

function createRegistrationRoutes(
  registrationController: RegistrationController
) {
  const router: Router = Router()

  router.post("/", registrationController.registerUser)
  return router
}

export default createRegistrationRoutes
