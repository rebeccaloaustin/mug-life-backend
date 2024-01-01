const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    address: {
        type: String
        // required: false
    },
    email: {
        type: String,
        required: true
    }
})



module.exports = User = mongoose.models.User || mongoose.model('User', UserSchema);



