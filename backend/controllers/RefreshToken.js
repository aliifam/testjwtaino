import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const user = await Users.findOne({ where: { refresh_token: token } });
        if (!user) return res.status(403).json({ message: "Forbidden" });

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: "Forbidden" });
            const { id, email, name } = user;
            const accessToken = jwt.sign(
                { id, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
