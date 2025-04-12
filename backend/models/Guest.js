class Guest {
    viewPopularPlace() {
        return "Viewing popular places";
    }

    signUp(name, email, password) {
        console.log(`name: ${name}, email: ${email}, password: ${password}`);
    }
}

export default Guest;