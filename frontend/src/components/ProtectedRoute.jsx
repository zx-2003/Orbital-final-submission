import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import social from "../api/social";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// check if we are authorized before we allow someone to access this route
// wrapping something in a protected route in app.jsx will ensure that we need an authorization token before we can proceed
// the children is the thing getting wrapped

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    // useEffect runs whenever we render the component
    // can pass in a second argument in the [] such that when that value changes, the useEffect is called upon once more. 
    // however the thing in the useEffect is only run again assuming the values in the [] change so presssing some button
    // that just provides the same value in [] will not reload the useEffect.
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // the 127.0.0.1..... that comes before /api handled by importing api from ../api in api.js file
            // sending the refreshToken to the backend to attempt to get a access token again
            const res = await social.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        // if the token is already expired...
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading</div>;
    }

    // if authorized go to wherever the children are otherwise go back to the login route
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;