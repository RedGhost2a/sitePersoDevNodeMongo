const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    urlToImage:String,
    url:String,
    author: String,
    publishedAt: Date,
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
