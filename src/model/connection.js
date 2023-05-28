const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/ecomm';

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}
//connecting to MongoDB Database
mongoose.connect(URL, connectionOptions).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Problem in connecting to MongoDB", error)
})

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, "Required Field"] },
    email: { type: String, required: [true, "Required Field"] },
    password: { type: String, required: [true, "Required Field"] }
}, { collection: "users", timestamps: true , versionKey: false })

let collection = {}

collection.getUserCollection = async () => {
    try {
        let userModel = await mongoose.model('users', userSchema);
        return userModel;
    }
    catch (error) {
        let err = new Error("Database connection failed");
        err.status(500);
        throw err;
    }
}

module.exports = collection;
