import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from './config/database.js';
import routes from './routes/index.js';
import cors from "cors";
import env from "dotenv";

env.config();
// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('\nGuest Routes:');
    console.log('- GET /guest/popular - View popular places');
    console.log('- POST /guest/signup - Sign up as a new user');
    
    console.log('\nUser Routes:');
    console.log('- POST /users/login - Login as a user');
    console.log('- GET /users/:id - Get user profile');
    console.log('- PUT /users/:id - Edit user information');
    console.log('- DELETE /users/:id - Delete user account');
    
    console.log('\nPlace Routes:');
    console.log('- GET /places - Get all places');
    console.log('- GET /places/popular - Get popular places');
    console.log('- GET /places/:id - Get place details');
    console.log('- POST /places - Create new place');
    console.log('- PUT /places/:id - Update place');
    console.log('- POST /places/:id/reviews - Add review to place');
    console.log('- DELETE /places/:id - Delete place');
    
    console.log('\nRecommendation Routes:');
    console.log('- GET /recommendations - Get travel recommendations');
    
    console.log('\nAdmin Routes:');
    console.log('- GET /admin/dashboard - View admin dashboard');
    console.log('- POST /admin/places - Add a new place');
    console.log('- POST /admin/users - Add a new user');
    console.log('- DELETE /admin/users/:id - Remove a user');
});