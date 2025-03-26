import { Router } from "express"
import RegistrationController from "../controllers/registrationController"
import { validate } from "../middlewares/validate"
import { registrationBodySchema } from "../../../shared/schema/registrationSchema"

function createRegistrationRoutes(
  registrationController: RegistrationController
) {
  const router: Router = Router()

  router.post(
    "/",
    validate({ body: registrationBodySchema }),
    registrationController.registerUser
  )
  return router
}

export default createRegistrationRoutes
