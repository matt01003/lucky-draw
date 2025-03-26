import { Draw } from "../../../shared/schema/drawSchema"
import { RegistrationDto } from "../../../shared/schema/registrationSchema"
import { AppError, DatabaseError, NotFoundError } from "../appErrors"
import RegistrationService from "./registrationService"

class DrawService {
  private db
  private registrationService
  constructor(db: any, registrationService: RegistrationService) {
    this.db = db
    this.registrationService = registrationService
  }

  private getNextSunday4pmUTC(): Date {
    const date = new Date()
    date.setUTCHours(16, 0, 0, 0)
    const day = date.getUTCDay()
    const daysToAdd = day === 0 ? 7 : 7 - day
    date.setUTCDate(date.getUTCDate() + daysToAdd)
    return date
  }

  private selectRandomWinners(
    participants: RegistrationDto[],
    count: number
  ): RegistrationDto[] {
    return participants.sort(() => Math.random() - 0.5).slice(0, count)
  }

  async createDraw(): Promise<Draw> {
    const date = this.getNextSunday4pmUTC()
    const [draw] = await this.db("draws")
      .insert({ drawTime: date, status: "pending" })
      .returning("*")

    if (!draw) {
      throw new DatabaseError("create draw failed")
    }
    console.log(`Draw created: ${date.toISOString()}, Draw ID: ${draw.id}`)
    return draw
  }

  async getCurrentDraw(): Promise<Draw> {
    const draw = await this.db("draws").orderBy("drawTime", "desc").first()
    if (!draw) {
      throw new NotFoundError("no current draw found")
    }
    return draw
  }

  async performWeeklyDraw(): Promise<void> {
    const currentDraw = await this.getCurrentDraw()
    const registrations =
      await this.registrationService.getRegistrationsByDrawId(currentDraw.id)
    const winners = this.selectRandomWinners(registrations, 3)

    console.log("Winners: ", winners)
    await this.createDraw()
  }
}

export default DrawService
