import express from 'express';
import guestRoutes from './guestRoutes.js';
import userRoutes from './userRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import adminRoutes from './adminRoutes.js';
import placeRoutes from './placeRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Travel Recommendation System API');
});

router.use('/users', userRoutes);  
router.use('/guest', guestRoutes); 
router.use('/recommendations', recommendationRoutes);
router.use('/admin', adminRoutes);
router.use('/places', placeRoutes);

export default router;