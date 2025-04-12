import Place from '../models/Place.js';

class PlaceBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.place = new Place("", "");
        return this;
    }

    setName(name) {
        this.place.name = name;
        return this;
    }

    setDescription(description) {
        this.place.description = description;
        return this;
    }

    addReview(review) {
        this.place.reviews.push(review);
        return this;
    }

    build() {
        const result = this.place;
        this.reset();
        return result;
    }
}

export default PlaceBuilder;