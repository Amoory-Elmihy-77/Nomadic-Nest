import Repository from '../patterns/Repository.js';

class UserRepository extends Repository {
    constructor() {
        super();
    }

    findByEmail(email) {
        return this.items.find(user => user.email === email);
    }
}

export default UserRepository;