class Admin {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    addUser(name, id) {
        console.log(`name: ${name}, id: ${id}`);
    }

    removeUser(id, name) {
        console.log(`id: ${id}, name: ${name}`);
    }

    viewDashboard() {
        console.log('Viewing dashboard...');
    }

    addNewPlace(name, description) {
        console.log(`name: ${name}, description: ${description}`);
    }
}

export default Admin;