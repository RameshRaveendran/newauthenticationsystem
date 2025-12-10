const mongoose = require('mongoose');

//db connection block
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");
        console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
    } catch (error) {
        console.log("DB ERROR" , error);
        process.exit(1);
        
    }
};
//exporting cdb
module.exports = connectDB;