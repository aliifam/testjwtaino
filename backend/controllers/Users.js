import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "email", "name"],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const Register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        const checkEmail = await Users.findOne({
            where: {
                email,
            },
        });

        if (checkEmail) {
            return res
                .status(400)
                .json({ message: "User with this email already exists." });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await Users.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return res.status(201).json("User created successfully.");
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: "User does not exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );

        const refreshToken = jwt.sign(
            { email: user.email, id: user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        user.refresh_token = refreshToken;
        await user.save();

        return res
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong." });
    }
};

export const Logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(204).json({ message: "No content" });

    const user = await Users.findOne({ where: { refresh_token: token } });
    if (!user) return res.status(204).json({ message: "No content" });

    await user.update({ refresh_token: null });

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully." });
};

export const editUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    try {
        await Users.update({ name: name }, { where: { id: id } });
        return res.status(200).json("User updated successfully.");
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

export const getUserName = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findOne({ where: { id: id } });
        return res.status(200).json(user.name);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await Users.destroy({ where: { id: id } });
        return res.status(200).json("User deleted successfully.");
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};
