const mongoose = require("mongoose");

// mongoose.connect(URI);
const URI = process.env.MONGODB_URI;
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.error('connection successful to DB');
    } catch (error) {
        console.error('database connection failed');
        process.exit(0);
    }
};

module.exports = connectDb;