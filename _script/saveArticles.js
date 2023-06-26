const mongoose = require('mongoose');

// Modèle de l'article
const Article = require('../_models/article');
const TranslatedArticle = require("../_models/translatedArticle");

async function saveArticles(articles, isTranslated = false) {
    // Connexion à la base de données MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/news-app', {

        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const ArticleModel = isTranslated ? TranslatedArticle : Article;

    // Parcourir les articles et les ajouter à la base de données
    for (const articleData of articles) {
        const article = new Article({
            title: articleData.title,
            content: articleData.content,
            description: articleData.description,
            urlToImage:articleData.urlToImage,
            url:articleData.url,
            author: articleData.author,
            keyword: articleData.keywords,
            bigram: articleData.bigramKeywords,
            publishedAt: new Date(articleData.publishedAt),
        });

        await article.save();

        console.log('Article enregistré :', article.title);
    }

    mongoose.connection.close();
}

module.exports = saveArticles;
