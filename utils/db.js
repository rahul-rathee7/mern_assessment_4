let mongoose = require('mongoose');

let connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;