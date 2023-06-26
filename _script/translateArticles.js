const axios = require('axios');

async function translateArticles(articles) {
    const translatedArticles = [];

    for (const article of articles) {
        // console.log(article)
        // Traduire les champs de l'article
        const title = await translateText(article.title);
        const content = await translateText(article.content);
        const description = await translateText(article.description);

        translatedArticles.push({ ...article, title, content, description });
    }

    return translatedArticles;
}

async function translateText(text) {
    try {
        const response = await axios.post('https://libretranslate.com/translate', {
            q: text,
            source: 'en',
            target: 'fr',
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la traduction du texte :', error.message);
        return text;
    }
}


module.exports = translateArticles;
