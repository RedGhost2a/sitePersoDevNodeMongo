const mongoose = require('mongoose');
const axios = require('axios');

// Modèle de l'article
const Article = require('../_models/article');

// Clé d'API pour News API
const apiKey = '9ed95b3b91664ca5b4f1db2750fefa32';

// Fonction pour extraire les nouvelles informatiques et les ajouter à la base de données
async function fetchAndSaveNews() {
    try {
        // Appel à l'API News API pour obtenir les articles informatiques
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                apiKey,
                category: 'technology',
                language: 'fr',
            },
        });
        const articles = response.data.articles;

        // Connexion à la base de données MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/news-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Parcourir les articles et les ajouter à la base de données
        for (const articleData of articles) {
            const article = new Article({
                title: articleData.title,
                content: articleData.content,
                description: articleData.description,
                urlToImage:articleData.urlToImage,
                url:articleData.url,
                author: articleData.author,
                publishedAt: new Date(articleData.publishedAt),
            });
            await article.save();
            console.log('Article enregistré :', article.title);
        }

        console.log('Extraction et enregistrement des nouvelles terminés.');
        mongoose.connection.close();
    } catch (error) {
        console.error('Erreur lors de l\'extraction et de l\'enregistrement des nouvelles :', error.message);
    }
}

// Appel de la fonction pour extraire et enregistrer les nouvelles
 fetchAndSaveNews();
