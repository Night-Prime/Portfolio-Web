import express, { Response, Request, NextFunction } from "express";
import { createPost, getPosts } from "../controllers/post";

const router = express.Router();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    await createPost(req, res, next);
})

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    await getPosts(req, res, next);
})

export default router;