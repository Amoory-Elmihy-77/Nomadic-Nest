import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import UserRepository from './repositories/UserRepository.js';
import PlaceRepository from './repositories/PlaceRepository.js';
import UserFactory from './patterns/Factory.js';
import PlaceBuilder from './patterns/Builder.js';
import routes from './routes/index.js';

dotenv.config();


const userRepository = UserRepository.getInstance();
const placeRepository = PlaceRepository.getInstance();

// Chain of responsibility
userRepository.setNext(placeRepository);

// Set up some initial data
export const initializeData = () => {
    // Add Fake places
    const placeBuilder = new PlaceBuilder();

    const place1 = placeBuilder
        .setName("Eiffel Tower")
        .setDescription("Famous landmark in Paris")
        .addReview("Beautiful view!")
        .build();
    
    const place2 = placeBuilder
        .setName("Grand Canyon")
        .setDescription("Natural wonder in Arizona")
        .addReview("Breathtaking!")
        .addReview("Amazing natural beauty")
        .build();
    
    const place3 = placeBuilder
        .setName("Tokyo Tower")
        .setDescription("Famous tower in Tokyo")
        .addReview("Great night view")
        .build();
    
    placeRepository.add(place1);
    placeRepository.add(place2);
    placeRepository.add(place3);

    // Create an admin user
    const admin = UserFactory.createUser('admin', 'Brouno', 'brouno@example.com');
    userRepository.add(admin);

    // Create a regular user
    let user = UserFactory.createUser('user', 'Youssef', 'youssef@example.com', 'password123');
    userRepository.add(user);
    user = UserFactory.createUser('user', 'Arafa', 'arafa@example.com', 'password123');
    userRepository.add(user);
    user = UserFactory.createUser('user', 'Ola', 'ola@example.com', 'password123');
    userRepository.add(user);
    user = UserFactory.createUser('user', 'Mariam', 'mariam@example.com', 'password123');
    userRepository.add(user);
    user = UserFactory.createUser('user', 'Ammar', 'ammar@example.com', 'password123');
    userRepository.add(user);

    // Add some favorites
    user.addFavorite(place1);
    user.addFavorite(place3);
};

const app = express();
app.use(bodyParser.json());

app.use('/', routes);


export default app;