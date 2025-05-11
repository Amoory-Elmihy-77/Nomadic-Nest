import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';

const router = express.Router();
const userRepository = UserRepository.getInstance();
const placeRepository = PlaceRepository.getInstance();

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update user profile
router.put('/:id', async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
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