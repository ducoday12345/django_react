import {useState} from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

//route: path to submit form
//method: register or log in
function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        
        try { 
            const res = await api.post(route, {username, password})
            if (method === "login"){ //if the method is login 
                localStorage.setItem(ACCESS_TOKEN, res.data.access); // Store the access token in local storage
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh); // Store the refresh token in local storage
                navigate("/") // Navigate to the home page
            }else{ // If the method is not "login" ( register)
                navigate("/login") // Navigate to the login page
            }
        }
        catch(error){
            alert(error)
        }finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{method === "Login" ? "Login" : "Register"}</h1>
        <input
            className="form-input"
            type="text"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}