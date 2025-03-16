import { CronJob } from "cron"
import DrawService from "./services/drawService"

async function initializeDraws(drawService: DrawService): Promise<void> {
  try {
    const currentDraw = await drawService.getCurrentDraw()
    if (!currentDraw) {
      await drawService.createDraw()
    }

    // Runs every Sunday at 16:00 (4 PM) UTC
    new CronJob(
      "0 0 16 * * 0",
      async () => {
        try {
          await drawService.performWeeklyDraw()
        } catch (error) {
          console.error("Error creating weekly draw:", error)
        }
      },
      null,
      true,
      "UTC"
    )
  } catch (error) {
    console.error("Failed to initialize draws:", error)
  }
}

export default initializeDraws
