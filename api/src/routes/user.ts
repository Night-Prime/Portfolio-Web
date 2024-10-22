import express, { Request, Response } from "express";
import { userLogin, userRegister } from "../controllers/user";
import { userRegisterValidation } from "../middleware/validation";

const router = express.Router();

router.post("/register", userRegisterValidation(), async (req: Request, res: Response) => {
    await userRegister(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
    await userLogin(req, res);
})

export default router;