class Place {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.reviews = [];
    }

    displayReviews() {
        return this.reviews;
    }

    addReview(review) {
        this.reviews.push(review);
    }
}

export default Place;