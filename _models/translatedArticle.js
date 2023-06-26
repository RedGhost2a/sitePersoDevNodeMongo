const mongoose = require('mongoose');

const TranslatedArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    description: String,
    urlToImage: String,
    url: String,
    author: String,
    keyword: [String],
    bigram: [String],
    publishedAt: Date,
});

const TranslatedArticle = mongoose.model('TranslatedArticle', TranslatedArticleSchema, 'translated_articles');

module.exports = TranslatedArticle;
