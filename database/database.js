

const mongoose = require("mongoose")

exports.connectDatabase = async () => {
    // Connecting database

    try {
        const mongoDB_key = process.env.MONGO_URL;
        await mongoose.connect(mongoDB_key);

        console.log("Database is Connected Successfully.....")

    } catch (error) {

        console.log(error)

    }

}