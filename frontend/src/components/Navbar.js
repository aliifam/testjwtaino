import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = () => {
        try {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/logout`);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav
            className="navbar is-light"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img
                            src="https://www.ainosi.co.id/pixld-app/media/2021/08/LOGO-AINO-INDONESIA.svg"
                            width="112"
                            height="28"
                            alt="ainosi"
                        />
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="buttons">
                        <button
                            onClick={Logout}
                            className="button is-danger has-text-white"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
