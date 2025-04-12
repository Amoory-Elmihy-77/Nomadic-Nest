import Repository from '../patterns/Repository.js';

class PlaceRepository extends Repository {
    constructor() {
        super();
    }

    getPopularPlaces() {
        return this.items.slice(0, 5);
    }

    getPlacesByPriceRange(price) {
        // Simulating a price attribute for places
        return this.items.filter(place => {
            // Assume each place has a random price for demo purposes
            const placePrice = Math.floor(Math.random() * 500);
            return placePrice <= price;
        });
    }
}

export default PlaceRepository;