import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/token`
                );
                if (response.status === 200) {
                    navigate("/");
                }
            } catch (error) {
                navigate("/login");
            }
        };
        checkLogin();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const Login = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                email,
                password,
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const goRegister = () => {
        navigate("/register");
    };

    return (
        <section className="hero has-background-gray-light is-fullwidth is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Login} className="box">
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        name=""
                                        id=""
                                        className="input"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        className="input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <p className="has-text-centered has-text-danger">
                                    {error}
                                </p>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">
                                        Login
                                    </button>
                                </div>
                                <p className="has-text-centered has-text-danger">
                                    Dont have an account?
                                    <span
                                        className="is-clickable has-text-info"
                                        onClick={goRegister}
                                    >
                                        {" "}
                                        Register
                                    </span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
