import express, { Response, Request, NextFunction } from "express";
import { createPost, deletePost, getPostById, getPostsByAuthor, getPosts } from "../controllers/post";
import { createPostValidation, grabPostByIdValidation } from "../middleware/validation";
import multer from "multer";
import { storage } from "../config/storage";
import { authenticate } from "../middleware/auth";

const upload = multer({ storage });


const router = express.Router();

router.post("/create", upload.single('image'), authenticate, async (req: Request, res: Response, next: NextFunction) => {
    await createPost(req, res, next);
})

router.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    await getPosts(req, res, next);
});

router.get("/byAuthor", authenticate, async (req: Request, res: Response, next: NextFunction) => {
    await getPostsByAuthor(req, res, next);
});

router.get("/:postId", async (req: Request, res: Response, next: NextFunction) => {
    await getPostById(req, res, next);
})

router.delete("/:postId", grabPostByIdValidation(), authenticate, async (req: Request, res: Response, next: NextFunction) => {
    await deletePost(req, res, next);
})

export default router;