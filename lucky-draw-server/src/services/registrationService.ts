import { Draw } from "../../../shared/types/draw"
import { Registration } from "../../../shared/types/registration"

class RegistrationService {
  private db
  constructor(db: any) {
    this.db = db
  }

  async registerUser(drawId: number, userId: string): Promise<Registration> {
    const currentDraw: Draw = await this.db("draws")
      .orderBy("drawTime", "desc")
      .first()

    if (!currentDraw || currentDraw.id !== drawId) {
      throw new Error("Draw not found")
    }

    const [registration]: Registration[] = await this.db("registrations")
      .insert({ drawId: drawId, userId: userId })
      .returning("*")

    return registration
  }

  async getRegistrationsByDrawId(drawId: number): Promise<Registration[]> {
    return this.db("registrations")
      .select("userId", "registeredAt")
      .where({ drawId: drawId })
  }

  async getUserRegistrations(userId: number): Promise<any[]> {
    return this.db("registrations")
      .select("draws.*", "registrations.registeredAt")
      .join("draws", "registrations.drawId", "draws.id")
      .where({ userId: userId })
  }
}

export default RegistrationService
