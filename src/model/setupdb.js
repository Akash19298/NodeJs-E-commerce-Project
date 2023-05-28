//const mongoose = require('mongoose');
const collection = require('./connection');

let userDB = [{
    name: "Akash Rawat",
    email: "akash@test.com",
    password: "ak@123"
},
{
    name: "Arun Rawat",
    email: "arun@test.com",
    password: "ar@123"
}, {
    name: "Suman Rawat",
    email: "suman@test.com",
    password: "su@123"
}]

module.exports = async () => {
    try {
        let userCollection = await collection.getUserCollection();
        let insertedData = await userCollection.create(userDB);
        if (insertedData.length) {
            return { message: "Database Initialized" }
        } else {
            let err = new Error("Database initialization failed")
            err.status = 500
            throw err;
        }

    } catch (error) {
        let err = new Error("Database initialization failed")
        err.status = 500
        throw err;
    }
}