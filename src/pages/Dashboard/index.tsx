import { Navigate} from "react-router-dom"

export default function(){
    const handleLogout = () =>{
        localStorage.removeItem("authToken")
        return <Navigate to="/login" replace/>
    }

    return(
        <>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}