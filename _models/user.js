const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    token:{
        type:String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {  // à noter: dans un vrai scénario, assurez-vous de hacher le mot de passe avant de le stocker.
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    webSite: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },

    // Vous pouvez ajouter plus de champs si nécessaire
});

module.exports = mongoose.model('User', UserSchema);
