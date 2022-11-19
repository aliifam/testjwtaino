import express from "express";
import {
    getUsers,
    Register,
    Login,
    Logout,
    editUser,
    getUserName,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.put("/users/:id", verifyToken, editUser);
router.put("/users/:id", verifyToken, getUserName);

export default router;
