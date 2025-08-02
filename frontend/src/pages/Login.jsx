import Form from "../components/Form"
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    return (
        <div>
            <Form route="/api/token/" method="login" />
            <div>
                <p style={
                    {   
                        textAlign:"center", 
                        textDecoration:"underline",
                        color:"blue",
                        cursor:"pointer",
                    }
                } 
                    onClick={() => {navigate("/register")}}>Register here</p>
            </div>
        </div>
    )
        
}

export default Login;