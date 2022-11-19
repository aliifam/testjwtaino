import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [id, setId] = useState("");
    const [expired, setExpired] = useState("");
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        refrestToken();
        getUsers();
    }, []);

    const refrestToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setId(decoded.id);
            setExpired(decoded.exp);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }
    };

    const axiosWithToken = axios.create();

    axiosWithToken.interceptors.request.use(
        async (config) => {
            const currentTime = Date.now() / 1000;
            if (currentTime >= expired) {
                const response = await axios.get("http://localhost:5000/token");
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setId(decoded.id);
                setExpired(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const getUsers = async () => {
        const response = await axiosWithToken.get(
            "http://localhost:5000/users",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setUsers(response.data);
    };

    const editName = () => {
        navigate(`/edit/${id}`);
    };
    return (
        <div className="container mt-5">
            <h1 className="mb-5">Current User : {name}</h1>
            <button className="button is-info mb-5" onClick={editName}>
                Edit Name
            </button>

            <table className="table is-stripped is-fullwidth">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
