import { z } from "zod"

export const registrationSchema = z.object({
  id: z.number(),
  drawId: z.number(),
  userId: z.string(),
  registeredAt: z.date(),
})

export const registrationBodySchema = z.object({
  drawId: z.number(),
  userId: z.string(),
})

export type RegistrationDto = z.infer<typeof registrationSchema>
export type RegistrationBodyDto = z.infer<typeof registrationBodySchema>
