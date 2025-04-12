import express from 'express';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';

const router = express.Router();
const userRepository = UserRepository.getInstance();
const placeRepository = PlaceRepository.getInstance();

    // login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = userRepository.findByEmail(email);

    // Check if user exists and password matches
    if (user && user.login(user.name, password)) {
        res.json({ success: true, userId: user.userID });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Other routes remain the same
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = userRepository.findById(parseInt(id));

    if (user) {
        user.editInformation(name, email);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

router.post('/:id/favorites', (req, res) => {
    const { id } = req.params;
    const { placeName } = req.body;

    const user = userRepository.findById(parseInt(id));
    const place = placeRepository.getAll().find(p => p.name === placeName);

    if (user && place) {
        user.addFavorite(place);
        return res.json({ success: true });
    }

    return res.status(404).json({ success: false, message: 'User or place not found' });
});

router.post('/:id/comment', (req, res) => {
    const { id } = req.params;
    const { placeName, comment } = req.body;

    const user = userRepository.findById(parseInt(id));
    const place = placeRepository.getAll().find(p => p.name === placeName);

    if (user && place) {
        user.writeComment(place, comment);
        res.json({ success: true, place });
    } else {
        res.status(404).json({ success: false, message: 'User or place not found' });
    }
});

export default router;