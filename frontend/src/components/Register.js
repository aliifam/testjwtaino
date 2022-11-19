import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const response = await axios.get("http://localhost:5000/token");
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", {
                name,
                email,
                password,
                confirmPassword: confirmpassword,
            });
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
                            <form onSubmit={Register} className="box">
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
                                <div className="field mt-5">
                                    <label className="label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        className="input"
                                        placeholder="Confirm Password"
                                        value={confirmpassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <p className="has-text-centered has-text-danger">
                                    {error}
                                </p>
                                <div className="field mt-5">
                                    <button className="button is-success is-fullwidth">
                                        Register
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

export default Register;
