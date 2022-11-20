import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditProfile = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");

    const [token, setToken] = useState("");
    const [expired, setExpired] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        refrestToken();
    }, []);

    const refrestToken = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/token`
            );
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpired(decoded.exp);
            setId(decoded.id);
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
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/token`
                );
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name);
                setExpired(decoded.exp);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const Editprofile = async (e) => {
        e.preventDefault();
        try {
            await axiosWithToken.put(
                `${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <section className="hero has-background-gray-light is-fullwidth is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Editprofile} className="box">
                                <div className="field mt-5">
                                    <label className="label">Name</label>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        className="input"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>

                                <p className="has-text-centered has-text-danger">
                                    {error}
                                </p>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">
                                        Change Name
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProfile;
