const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/Supreme', {
}).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.error("MongoDB Connection error", error);
});

module.exports = mongoose;
