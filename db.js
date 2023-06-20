// db.js
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/news-app', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
    }
}

module.exports = { connect };
