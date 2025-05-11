import User from './User.js';
import Place from './Place.js';

class Guest {
    async viewPopularPlaces() {
        try {
            return await Place.find()
                .sort({ averageRating: -1 })
                .limit(5)
                .populate('reviews.user', 'username');
        } catch (error) {
            throw new Error('Error fetching popular places: ' + error.message);
        }
    }

    async signUp(username, email, password) {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Create new user
            const user = new User({
                username,
                email,
                password
            });

            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
}

export default Guest;