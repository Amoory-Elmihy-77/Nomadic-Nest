import Repository from '../patterns/Repository.js';

class PlaceRepository extends Repository {
    constructor() {
        super();
    }

    getPopularPlaces() {
        return this.items.slice(0, 5);
    }

    getPlacesByPriceRange(price) {
        return this.items.filter(place => {
            const placePrice = Math.floor(Math.random() * 500);
            return placePrice <= price;
        });
    }
}

export default PlaceRepository;