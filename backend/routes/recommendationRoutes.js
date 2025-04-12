import express from 'express';
import RecommendationSystem from '../services/RecommendationSystem.js';

const router = express.Router();
const recommendationSystem = RecommendationSystem.getInstance();

router.get('/', (req, res) => {
    const { price } = req.query;
    const places = recommendationSystem.generatePlaces(parseInt(price) || 300);
    res.json(places);
});

export default router;