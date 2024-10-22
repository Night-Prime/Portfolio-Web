import express from 'express';
import UserRoutes from './user';
import PostRoutes from "./post";
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use("/user", UserRoutes);
router.use("/post", authenticate, PostRoutes);

router.get('/', async (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to Dhaniel Service',
    });
});

export default router;