import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Guest from '../models/Guest.js';

class UserFactory {
    static createUser(type, ...args) {
        switch (type.toLowerCase()) {
            case 'user':
                return new User(...args);
            case 'admin':
                return new Admin(...args);
            case 'guest':
                return new Guest();
            default:
                throw new Error('Invalid user type');
        }
    }
}

export default UserFactory;