import { z } from "zod"

const drawSchema = z.object({
  id: z.number(),
  drawTime: z.date(),
  status: z.enum(["pending", "completed"]),
})

export type Draw = z.infer<typeof drawSchema>
