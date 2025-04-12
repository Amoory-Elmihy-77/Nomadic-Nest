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
        const user = UserRepository.getInstance().findById(id);
        if (!user) {
            const newUser = new User(name, "default@email.com", "default");
            UserRepository.getInstance().add(newUser);
            return newUser;
        }
        return user;
    }

    removeUser(id, name) {
        return UserRepository.getInstance().remove(id);
    }

    viewDashboard() {
        const users = UserRepository.getInstance().getAll();
        const places = PlaceRepository.getInstance().getAll();
        return { users, places };
    }

    addNewPlace(name, description) {
        const place = new Place(name, description);
        PlaceRepository.getInstance().add(place);
        return place;
    }
}

export default Admin;