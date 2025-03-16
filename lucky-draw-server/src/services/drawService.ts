import { Draw } from "../../../shared/types/draw"
import { Registration } from "../../../shared/types/registration"
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
    participants: Registration[],
    count: number
  ): Registration[] {
    return participants.sort(() => Math.random() - 0.5).slice(0, count)
  }

  async createDraw(): Promise<Draw> {
    const date = this.getNextSunday4pmUTC()
    const [draw] = await this.db("draws")
      .insert({ drawTime: date, status: "pending" })
      .returning("*")
    console.log(`Draw created: ${date.toISOString()}, Draw ID: ${draw.id}`)
    return draw
  }

  async getDrawById(id: number): Promise<Draw> {
    return this.db("draws").where({ id }).first()
  }

  async getCurrentDraw(): Promise<Draw> {
    return this.db("draws").orderBy("drawTime", "desc").first()
  }

  async performWeeklyDraw(): Promise<void> {
    const currentDraw = await this.getCurrentDraw()
    if (!currentDraw) {
      throw new Error("No current draw found")
    }

    try {
      const registrations =
        await this.registrationService.getRegistrationsByDrawId(currentDraw.id)
      const winners = this.selectRandomWinners(registrations, 3)
      console.log("Winners: ", winners)

      await this.createDraw()
    } catch (error) {
      throw error
    }
  }
}

export default DrawService
