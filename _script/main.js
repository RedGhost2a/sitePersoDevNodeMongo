const fetchAndSaveNews = require('./fetchAndSaveNews');
const translateArticles = require('./translateArticles');
const saveArticles = require('./saveArticles');

async function main() {
    // Fetcher et enregistrer les articles en anglais
    const articles = await fetchAndSaveNews();


    // Traduire les articles en français
    const translatedArticles = await translateArticles(articles);

    // Enregistrer les articles traduits
    await saveArticles(translatedArticles, true);
}

main().catch(console.error);
