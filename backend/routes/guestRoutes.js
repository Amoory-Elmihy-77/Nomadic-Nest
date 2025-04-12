import express from 'express';
import Guest from '../models/Guest.js';

const router = express.Router();

// Guest routes
router.get('/popular', (req, res) => {
    const guest = new Guest();
    const popularPlaces = guest.viewPopularPlace();
    res.json(popularPlaces);
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const guest = new Guest();
    const user = guest.signUp(name, email, password);
    res.json({ success: true, userId: user.userID });
});

export default router;