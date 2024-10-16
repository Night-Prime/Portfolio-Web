import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.send({
        status: 200,
        message: 'Welcome to Dhaniel Service',
    });
});

export default router;