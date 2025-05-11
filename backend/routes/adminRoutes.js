import express from 'express';
import Admin from '../models/Admin.js';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';

const router = express.Router();
const userRepository = UserRepository.getInstance();

const checkAdminAccess = (req, res, next) => {
  const admin = userRepository.getAll().find(u => u instanceof Admin);
  if (admin) {
    req.admin = admin;
    next();
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

router.post('/setup', (req, res) => {
    const { name, email } = req.body;
    const users = userRepository.getAll();
    const existingAdmin = users.find(u => u instanceof Admin);
    
    if (existingAdmin) {
        return res.status(400).json({ 
            success: false, 
            message: 'Admin already exists' 
        });
    }

    const admin = new Admin(name, email);
    userRepository.add(admin);
    res.json({ success: true, admin });
});

router.use(checkAdminAccess);

router.get('/dashboard', (req, res) => {
    const dashboard = req.admin.viewDashboard();
    res.json(dashboard);
});

router.post('/places', (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and description are required' 
            });
        }
        const place = req.admin.addNewPlace(name, description);
        res.json({ success: true, place });    
    } catch (error) {
        console.error('Error adding place:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add place',
            error: error.message
        });
    }
});

router.post('/users', (req, res) => {
    try {
        const { name, id } = req.body;
        if (!name || !id) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and id are required' 
            });
        }
        const user = req.admin.addUser(name, id);
        res.json({ success: true, user });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add user',
            error: error.message
        });
    }
});
router.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const user = req.admin.removeUser(id);
        if (user) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'User not found',
                error: 'The specified user ID does not exist'
            });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
});

export default router;