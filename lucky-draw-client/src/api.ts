import { ApiResponse } from "@shared/types/apiResponse"
import { Draw } from "@shared/types/draw"
import { Registration } from "@shared/types/registration"
import axios from "axios"

const API_BASE_URL = "http://localhost:3000/api"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const Api = {
  getCurrentDraw: async () => {
    const { data } = await apiClient.get<ApiResponse<Draw>>("/draw/current")
    return data.data
  },

  registerUser: async (drawId: number, userId: string) => {
    const { data } = await apiClient.post<ApiResponse<Registration>>("/register", { userId, drawId })
    return data.data
  },
}
