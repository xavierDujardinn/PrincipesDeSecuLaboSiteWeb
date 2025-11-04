import React, { useState } from "react";
import { credentialsChecker } from "../Backend/credentialsChecker.js";
import toast from "react-hot-toast";
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setAuthStatus }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidLogin = credentialsChecker(username, password)

        if (isValidLogin) {
            toast.success("Login successful!");
            setAuthStatus(true);
            navigate('/home');
        }
        else {
            toast.error("Login failed!");
        }
    }

    return (
        <div className="login-container">
            <h2>Page de Connexion (Login)</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Utilisateur:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-button">
                    Se Connecter
                </button>
            </form>
        </div>
    );
}