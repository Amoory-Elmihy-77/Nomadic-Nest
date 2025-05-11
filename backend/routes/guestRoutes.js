import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();
const guest = new Guest();

router.get('/popular', async (req, res) => {
    try {
        const places = await guest.viewPopularPlaces();
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await guest.signUp(username, email, password);
        res.status(201).json({ 
            message: 'User created successfully', 
            userId: user._id 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;