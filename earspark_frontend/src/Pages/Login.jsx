import { useState } from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom"; // Import Link for navigation

function Login() {
    return (
        <div className="auth-container">
            <Form route="/api/token/" method="login" />
            <div className="auth-switch">
                Don't have an account?
                <Link to="/register" className="auth-link">Register here</Link>
            </div>
        </div>
    );
}

export default Login;
