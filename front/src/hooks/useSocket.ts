import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { BASE_URL } from "@/src/config"
import type { Product } from "@/src/types/product"
import { useSnackbar } from "notistack"

export const useSocket = () => {
  const socket = io(BASE_URL)
  const [, setIsConnected] = useState(socket.connected)
  const { enqueueSnackbar } = useSnackbar()
  const [eventResponse, setEventResponse] = useState<{ data: Product } | null>(null)

  const onConnect = () => {
    setIsConnected(true)
    enqueueSnackbar("Socket connected", { variant: "success"})
  }

  const onDisconnect = () => {
    setIsConnected(false)
    enqueueSnackbar("Socket disconnected", { variant: "error"})
  }

  const onProductChange = (response: { data: Product }) => {
    enqueueSnackbar("Socket event fired", { variant: "success"})
    setEventResponse(response)
  }

  useEffect(() => {
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("product:create", onProductChange)
    socket.on("product:delete", onProductChange)
    socket.on("product:update", onProductChange)
    
    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    eventResponse
  }
}
