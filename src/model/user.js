const collection = require('./connection');


let user = {}

user.registerUser = async (userDetails) => {
    let userModel = await collection.getUserCollection();
    let findUser = await userModel.find({ email: userDetails.email });
    if (findUser.length) {
        return null;
    } else {
        let insertUser = await userModel.create(userDetails);
        if (insertUser) {
            return insertUser;
        } else {
            let err = new Error("Something went wrong!! Registration Failed")
            err.status = 500;
            throw err;
        }
    }
}

user.loginUser = async (userDetails) => {
    let userModel = await collection.getUserCollection();
    let loginUser = await userModel.find({ email: userDetails.email });
    if (loginUser) {
        return loginUser;
    } else {
        let err = new Error("Something went wrong!! Login Failed")
        err.status = 500;
        throw err;
    }
}

module.exports = user;