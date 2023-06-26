const axios = require('axios');

// Clé d'API pour News API
const apiKey = '9ed95b3b91664ca5b4f1db2750fefa32';

async function fetchArticles() {
    const unique =[]
    try {
        // Appel à l'API News API pour obtenir les articles
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                apiKey,
                q: 'casino AND poker AND baccarat',
                language: 'en',
                sortBy:'popularity',
            },
        });

        for (const item of response.data.articles) {
            const dupli = unique.find((obj) => {
                return obj.title === item.title;
            });
            if (!dupli) {
                unique.push(item);
            }
        }

        console.log(unique)
        return unique;

    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error.message);
        return [];
    }
}

module.exports = fetchArticles;
