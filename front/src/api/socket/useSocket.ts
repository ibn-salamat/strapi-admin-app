import { BASE_URL } from "@/src/config"
import type { Product } from "@/src/types/product"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const useSocket = () => {
  const socket = io(BASE_URL)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const { enqueueSnackbar } = useSnackbar()

  const onConnect = () => {
    setIsConnected(true)
    enqueueSnackbar("Socket connected", { variant: "success"})
  }

  const onDisconnect = () => {
    setIsConnected(false)
    enqueueSnackbar("Socket disconnected", { variant: "error"})
  }

  const onCreateProduct = (response: { data: Product }) => {
    console.log(response.data)
  }

  useEffect(() => {
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("product:create", onCreateProduct)

    return () => {
      socket.disconnect()
    }
  }, [])


}
