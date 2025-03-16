import express from "express"
import cors from "cors"

import createDrawRoutes from "./src/routes/drawRoutes"
import createRegistrationRoutes from "./src/routes/registrationRoutes"
import DrawService from "./src/services/drawService"
import db from "./src/config/database"
import DrawController from "./src/controllers/drawController"
import RegistrationService from "./src/services/registrationService"
import RegistrationController from "./src/controllers/registrationController"
import initializeDraws from "./src/initializedraws"

const app = express()
app.use(cors())
app.use(express.json())

const PORT: number = Number(process.env.PORT || 3000)

const registrationService = new RegistrationService(db)
const registrationController = new RegistrationController(registrationService)

const drawService = new DrawService(db, registrationService)
const drawController = new DrawController(drawService)

app.use("/api/register", createRegistrationRoutes(registrationController))
app.use("/api/draw", createDrawRoutes(drawController))

app.listen(PORT, () => {
  console.log("Server running on port", PORT)
  initializeDraws(drawService)
})
