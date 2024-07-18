import type { User } from "@/src/types/user"

export const saveCurrentUserToLocalStorage = (user: User | null) => {
    if (!user) {
        localStorage.removeItem("currentUser")
        return
    }
    
    localStorage.setItem("currentUser", JSON.stringify(user))
} 

export const getCurrentUserFromLocalStorage = (): User | null => {
    const data = localStorage.getItem("currentUser")
    if (!data) return null

    try {
        return JSON.parse(data)
    } catch (error) {
        return null
    }
}
