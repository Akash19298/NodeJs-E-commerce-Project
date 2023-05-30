const userDB = require('../model/user');
const bcrypt = require('bcrypt');

let userService = {}

const throwError = (errorMessage, status) => {
    let err = new Error(errorMessage);
    err.status = status;
    throw err;
}

userService.registerUser = async (userDetails) => {
    try {
        if (userDetails.name === "" || userDetails.password === "" || userDetails.email === "") {
            return { message: "Invalid name, password or email!!" }
        } else {
            //Hashing the incoming password for security 
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userDetails.password, salt)
            const uDetails = {
                name: userDetails.name,
                email: userDetails.email,
                password: hash
            }
            let insertUser = await userDB.registerUser(uDetails);
            if (insertUser === null) {
                return { message: `User already registered with this id ${userDetails.email} ` }
            } else {
                return { message: `Welcome ${userDetails.name}, your registration is successfully completed.` }
            }
        }
    } catch (error) {
        throwError("Something went wrong!! We will beback", 404);
    }
};

userService.loginUser = async (userDetails) => {
    try {
        if (userDetails.password === "" || userDetails.email === "") {
            return { message: "Invalid Email or Password!!" }
        } else {
            let loginUser = await userDB.loginUser(userDetails);
            if (loginUser.length) {
                //console.log(loginUser[0].password) //for fetching password field from mongoDB data
                let comparePassword = bcrypt.compareSync(userDetails.password, loginUser[0].password)
                if (comparePassword) {
                    return { message: "Login Successfull" }
                } else {
                    return { message: "Incorrect password!!" }
                }
            } else {
                return { message: "User not registered!!" }
            }
        }
    } catch (err) {
        throwError("Something went wrong!! We will be back", 404);
    }
};

module.exports = userService;