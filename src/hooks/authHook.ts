
export default function isAutheticated(): boolean{
    if(localStorage.getItem("authToken") === "ADM"){
        return true
    }
    return false
}