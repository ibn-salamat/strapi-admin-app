import { BASE_URL } from "@/src/config"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const socket = io(BASE_URL)

export const useSocket = () => {
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

  const onCreateProduct = data => {
    console.log(data)
  }

  useEffect(() => {
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("product:create", onCreateProduct)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("product:create")
    }
  }, [])
}
