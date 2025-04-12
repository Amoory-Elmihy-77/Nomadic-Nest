import User from '../models/User.js';
import UserRepository from '../repositories/UserRepository.js';
import PlaceRepository from '../repositories/PlaceRepository.js';
import RecommendationSystem from '../services/RecommendationSystem.js';
import PlaceBuilder from './Builder.js';

class TravelSystemFacade {
    constructor() {
        this.userRepository = UserRepository.getInstance();
        this.placeRepository = PlaceRepository.getInstance();
        this.recommendationSystem = RecommendationSystem.getInstance();
    }

    register(name, email, password) {
        const user = new User(name, email, password);
        this.userRepository.add(user);
        return user;
    }

    login(email, password) {
        const user = this.userRepository.findByEmail(email);
        if (user && user.login(user.name, password)) {
            return user;
        }
        return null;
    }

    getRecommendations(price) {
        return this.recommendationSystem.generatePlaces(price);
    }

    addPlace(name, description) {
        const builder = new PlaceBuilder();
        const place = builder
            .setName(name)
            .setDescription(description)
            .build();

        this.placeRepository.add(place);
        return place;
    }

    addFavorite(userId, placeName) {
        const user = this.userRepository.findById(userId);
        const place = this.placeRepository.getAll().find(p => p.name === placeName);
    
        if (user && place) {
            user.addFavorite(place);
            return true;
        }
        return false;
    }
}

export default TravelSystemFacade;