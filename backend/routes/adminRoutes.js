import express from 'express';
import Admin from '../models/Admin.js';
import UserRepository from '../repositories/UserRepository.js';

const router = express.Router();
const userRepository = UserRepository.getInstance();

// Admin middleware to check for admin access
const checkAdminAccess = (req, res, next) => {
  // In a real app, would check admin authentication
  const admin = userRepository.getAll().find(u => u instanceof Admin);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

router.use(checkAdminAccess);

router.get('/dashboard', (req, res) => {
    const dashboard = req.admin.viewDashboard();
    res.json(dashboard);
});

router.post('/places', (req, res) => {
    const { name, description } = req.body;
    const place = req.admin.addNewPlace(name, description);
    res.json({ success: true, place });
});

router.post('/users', (req, res) => {
    const { name, email, password, id } = req.body;
    const user = req.admin.addUser(name, email, password, id);
    res.json({ success: true, user });
});

router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.admin.removeUser(parseInt(id));
    if (user) {
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

export default router;