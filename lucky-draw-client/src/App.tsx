import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import "./App.css"
import { Api } from "./api"
import { format } from "date-fns"

interface RegisterForm {
  userId: string
}

function App() {
  const { register, handleSubmit } = useForm<RegisterForm>()

  const {
    data: currentDraw,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentDraw"],
    queryFn: () => Api.getCurrentDraw(),
  })
  console.log(currentDraw)

  const registerMutation = useMutation({
    mutationFn: ({ drawId, userId }: { drawId: number; userId: string }) =>
      Api.registerUser(drawId, userId),
    onSuccess: () => {
      window.alert("Register success")
    },
    onError: ({ error }: { error: Error }) => {
      console.error(error)
    },
  })

  const onSubmit = (data: RegisterForm) => {
    if (!currentDraw) return
    registerMutation.mutate({
      drawId: currentDraw.id,
      userId: data.userId,
    })
  }

  if (!currentDraw || isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>Draw ID: {currentDraw.id}</div>
        <div>
          Date: {format(currentDraw.drawTime, "yyyy-MM-dd HH:mm:ss.SSS")}
        </div>
        <div>
          <input
            {...register("userId", { required: true })}
            placeholder="User ID"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default App
