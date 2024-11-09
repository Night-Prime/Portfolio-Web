import express, { Request, Response, NextFunction } from "express";
import { createCommentValidation, getCommentByIdValidation } from "../middleware/validation";
import { createComment, deleteComment } from "../controllers/comment";


const router = express.Router();

router.post("/create", createCommentValidation(), async (req: Request, res: Response, next: NextFunction) => {
    await createComment(req, res, next);
});

router.delete("/:commentId", getCommentByIdValidation(), async (req: Request, res: Response, next: NextFunction) => {
    await deleteComment(req, res, next);
});

export default router;