import { Draw } from "../../../shared/schema/drawSchema"
import { RegistrationDto } from "../../../shared/schema/registrationSchema"
import {
  ConflictError,
  DatabaseError,
  NotFoundError,
  ValidationError,
} from "../appErrors"

class RegistrationService {
  private db
  constructor(db: any) {
    this.db = db
  }

  async registerUser(drawId: number, userId: string): Promise<RegistrationDto> {
    const currentDraw: Draw = await this.db("draws")
      .orderBy("drawTime", "desc")
      .first()

    if (!currentDraw || currentDraw.id !== drawId) {
      throw new NotFoundError("draw not found")
    }

    const existingRegistration = await this.db("registrations")
      .where({ drawId, userId })
      .first()

    if (existingRegistration) {
      throw new ConflictError("User already registered this draw")
    }

    const [registration]: RegistrationDto[] = await this.db("registrations")
      .insert({ drawId: drawId, userId: userId })
      .returning("*")

    if (!registration) {
      throw new DatabaseError("Failed to create registration")
    }

    return registration
  }

  async getRegistrationsByDrawId(drawId: number): Promise<RegistrationDto[]> {
    if (!drawId) {
      throw new ValidationError("DrawId is required")
    }

    const registrations = await this.db("registrations")
      .select("userId", "registeredAt")
      .where({ drawId })

    if (!registrations) {
      throw new NotFoundError("No registration found")
    }

    return registrations
  }
}

export default RegistrationService
