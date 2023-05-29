const userDB = require('../model/user');

let userService = {}

const throwError = (errorMessage, status) => {
    let err = new Error(errorMessage);
    err.status = status;
    throw err;
}

userService.registerUser = async (userDetails) => {
    try {
        let insertUser = await userDB.registerUser(userDetails);
        if (insertUser === null) {
            return { message: `User already registered with this id ${userDetails.email} ` }
        } else {
            return { message: `Welcome ${userDetails.name}, your registration is successfully completed.` }
        }
    } catch (error) {
        throwError("Something went wrong!! We will beback", 404);
    }
};

userService.loginUser = async (userDetails) => {
    try {
        let loginUser = await userDB.loginUser(userDetails);
        //console.log(loginUser[0].password) //for fetching password field from mongoDB data
        if (loginUser.length) {
            if (userDetails.password === loginUser[0].password) {
                return { message: "Login Successfull" }
            } else {
                return { message: "Incorrect password!!" }
            }
        } else {
            return { message: "User not registered!!" }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404);
    }
};

module.exports = userService;