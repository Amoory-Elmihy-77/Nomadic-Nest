import app, {initializeData} from './app.js';


initializeData();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- GET /popular - View popular places (Guest)');
    console.log('- POST /signup - Sign up as a new user (Guest)');
    console.log('- POST /login - Login as a user');
    console.log('- PUT /user/:id - Edit user information');
    console.log('- POST /user/:id/favorites - Add a place to favorites');
    console.log('- POST /user/:id/comment - Write a comment for a place');
    console.log('- GET /recommendations?price=300 - Get recommendations');
    console.log('- GET /admin/dashboard - View admin dashboard');
    console.log('- POST /admin/places - Add a new place');
    console.log('- POST /admin/users - Add a new user');
    console.log('- DELETE /admin/users/:id - Remove a user');
});