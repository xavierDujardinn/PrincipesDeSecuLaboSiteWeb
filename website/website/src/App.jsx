import { useState } from 'react'
import {Login} from "./Screens/Login.jsx";
import {Toaster} from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {Home} from './Screens/Home.jsx';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Router>
                <div className="App">

                    <Routes>
                        <Route path="/login" element={<Login setAuthStatus={handleLogin} />}/>
                        <Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn} />}/>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="*" element={<p>404 Page Not Found</p>} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

const ProtectedRoute = ({ isLoggedIn }) => {
    if (isLoggedIn) {
        return <Home />;
    }
    return <Navigate to="/login" replace />;
};

export default App
