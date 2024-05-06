import { Router } from "express";
import { login, userInfo } from "../controller/authController.js";

const router = Router();
router.post("/login", login);
router.post("/userInfoToken", userInfo);

export default router;
