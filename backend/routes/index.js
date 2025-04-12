import express from 'express';
import guestRoutes from './guestRoutes.js';
import userRoutes from './userRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Travel Recommendation System API');
});

// Mount login at root level for easier access
router.post('/login', userRoutes);

// Mount other route modules
router.use('/', guestRoutes);
router.use('/user', userRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/admin', adminRoutes);

export default router;