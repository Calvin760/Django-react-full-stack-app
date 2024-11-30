import { useState } from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom"; // Import Link for navigation

function Register() {
    return (
        <div className="auth-container">
            <Form route="/api/user/register/" method="register" />
            <div className="auth-switch">
                Already have an account?
                <Link to="/login" className="auth-link">Login here</Link>
            </div>
        </div>
    );
}

export default Register;
