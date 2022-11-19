import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    const refrestToken = async () => {
        try {
            const { data } = await axios.post("http://localhost:5000/refresh", {
                token,
            });
            setToken(data.token);
            localStorage.setItem("token", data.token);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Welcome : </h1>
        </div>
    );
};

export default Dashboard;
