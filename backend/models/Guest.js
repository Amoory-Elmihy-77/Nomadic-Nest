import User from './User.js';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';

class Guest {
    viewPopularPlace() {
        return PlaceRepository.getInstance().getPopularPlaces();
    }

    signUp(name, email, password) {
        const user = new User(name, email, password);
        UserRepository.getInstance().add(user);
        return user;
    }
}

export default Guest;