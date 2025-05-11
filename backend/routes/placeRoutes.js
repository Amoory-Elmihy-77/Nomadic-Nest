import express from 'express';
import Place from '../models/Place.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const places = await Place.find().populate('reviews.user', 'username');
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching places', error: error.message });
    }
});

router.get('/popular', async (req, res) => {
    try {
        const places = await Place.find()
            .sort({ averageRating: -1 })
            .limit(5)
            .populate('reviews.user', 'username');
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching popular places', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate('reviews.user', 'username');
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching place', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, location, price, images } = req.body;
        const place = new Place({
            name,
            description,
            location,
            price,
            images
        });
        await place.save();
        res.status(201).json({ message: 'Place created successfully', place });
    } catch (error) {
        res.status(500).json({ message: 'Error creating place', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, location, price, images } = req.body;
        const place = await Place.findById(req.params.id);
        
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        if (name) place.name = name;
        if (description) place.description = description;
        if (location) place.location = location;
        if (price) place.price = price;
        if (images) place.images = images;

        await place.save();
        res.json({ message: 'Place updated successfully', place });
    } catch (error) {
        res.status(500).json({ message: 'Error updating place', error: error.message });
    }
});

router.post('/:id/reviews', async (req, res) => {
    try {
        const { userId, comment, rating } = req.body;
        const place = await Place.findById(req.params.id);
        
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        place.reviews.push({
            user: userId,
            comment,
            rating
        });

        await place.save();
        res.status(201).json({ message: 'Review added successfully', place });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }
        res.json({ message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting place', error: error.message });
    }
});

export default router; 