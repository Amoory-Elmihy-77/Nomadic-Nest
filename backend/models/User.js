class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userID = User.nextID++;
    this.favorites = [];
  }

  login(name, password) {
    return this.name === name && this.password === password;
  }

  editInformation(name, email) {
    this.name = name || this.name;
    this.email = email || this.email;
    return this;
  }

  addFavorite(place) {
    if (!this.favorites.includes(place)) {
      this.favorites.push(place);
    }
    return this.favorites;
  }

  writeComment(place, comment) {
    place.addReview(comment);
    return place;
  }

  useRecommendationSystem(price) {
    return RecommendationSystem.getInstance().generatePlaces(price);
  }
}

User.nextID = 1;

export default User;