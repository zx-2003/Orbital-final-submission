import {useState} from "react"
import social from "../api/social"
import {useNavigate} from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

// route tells us what to do after form submission, method is register / login
// can read the logic for the form mostly depends on the route, which is either register or login . jsx which will use this
// then afterwards will post the data to the route specified.

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === "login" ? "login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // making a post to the route whichever it is with our username and password
            // this will be handled in the backend which sends a post request to whichever route in the backend
            // if its register itll send to the register route and then redirect to the login route
            // if its login it will just navigate to the homepage afterwards
            const res = await social.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                // if not login then its register, so after registering go back to the login page to login
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return <form onSubmit = {handleSubmit} className = "form-container">
        <h1>{name}</h1>

        <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

        <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form 