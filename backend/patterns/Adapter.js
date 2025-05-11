import Place from '../models/Place.js';

class LegacyRecommendation {
  generateRecommendations(preferences) {
    return [
      { name: "Old Town", rating: 4.5 },
      { name: "Beach Resort", rating: 4.2 },
      { name: "Mountain Retreat", rating: 4.7 }
    ];
  }
}

class RecommendationAdapter {
  constructor(legacySystem) {
    this.legacySystem = legacySystem;
  }

  generatePlaces(price) {
    const legacyRecommendations = this.legacySystem.generateRecommendations({ price });
    
    return legacyRecommendations.map(rec => {
      const place = new Place(rec.name, `A great place with rating: ${rec.rating}`);
      for (let i = 0; i < Math.floor(rec.rating); i++) {
        place.addReview(`Generated review ${i + 1}`);
      }
      return place;
    });
  }
}

export { LegacyRecommendation, RecommendationAdapter };