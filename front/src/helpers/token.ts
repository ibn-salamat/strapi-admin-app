export function getToken() : string | null{
    return localStorage.getItem("token")
}

export function setToken(token: string){
    return localStorage.setItem("token", token)
}