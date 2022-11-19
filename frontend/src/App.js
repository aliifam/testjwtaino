import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Dashboard />
                        </>
                    }
                />
                <Route path="/edit/:id" element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
