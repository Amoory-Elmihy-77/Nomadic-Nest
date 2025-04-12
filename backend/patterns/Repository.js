import  Singleton  from './Singleton.js';

class Repository extends Singleton {
    constructor() {
        super();
        this.items = [];
        this.nextRepo = null;
    }

    setNext(repo) {
        this.nextRepo = repo;
        return repo;
    }

    add(item) {
        this.items.push(item);
        return item;
    }

    remove(id) {
        const index = this.items.findIndex(item => item.userID === id || item.id === id);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return this.nextRepo ? this.nextRepo.remove(id) : null;
    }

    findById(id) {
        const item = this.items.find(item => item.userID === id || item.id === id);
        if (item) return item;
        return this.nextRepo ? this.nextRepo.findById(id) : null;
    }

    getAll() {
        return this.items;
    }
}

export default Repository;