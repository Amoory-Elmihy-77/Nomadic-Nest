import User from './User.js';
import Place from './Place.js';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';

class Admin {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    addUser(name, id) {
        try {
            const user = UserRepository.getInstance().findById(id);
            if (!user) {
                const newUser = new User({
                    username: name,
                    email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
                    password: 'defaultpassword'
                });
                UserRepository.getInstance().add(newUser);
                return newUser;
            }
            return user;
        } catch (error) {
            console.error('Error in addUser:', error);
            throw error;
        }
    }

    removeUser(id) {
        try {
            return UserRepository.getInstance().remove(id);
        } catch (error) {
            console.error('Error in removeUser:', error);
            throw error;
        }
    }

    viewDashboard() {
        try {
            const users = UserRepository.getInstance().getAll();
            const places = PlaceRepository.getInstance().getAll();
            return { users, places };
        } catch (error) {
            console.error('Error in viewDashboard:', error);
            throw error;
        }
    }

    addNewPlace(name, description) {
        try {
            const place = new Place({
                name: name,
                description: description,
                location: 'Default Location',
                price: 0,
                images: []
            });
            PlaceRepository.getInstance().add(place);
            return place;
        } catch (error) {
            console.error('Error in addNewPlace:', error);
            throw error;
        }
    }
}

export default Admin;