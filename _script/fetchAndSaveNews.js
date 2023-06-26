const fetchArticles = require('./fetchArticle');
const analyzeKeywords = require('./analyzeKeywords');
const saveArticles = require('./saveArticles');
const translateArticles = require("./translateArticles");

async function fetchAndSaveNews() {
    const articlesData = await fetchArticles();
    for (const articleData of articlesData) {
        if(articleData.content === null){
            continue;
        }

        const keywordsData = await analyzeKeywords(articleData.content);
        articleData.keywords = keywordsData.keywords;
        articleData.bigramKeywords = keywordsData.bigramKeywords;
    }

    // Traduire les articles

    // Enregistrer les articles traduits
    await saveArticles(articlesData);
    const translatedArticles = await translateArticles(articlesData);
    await saveArticles(translatedArticles, true);
}

module.exports =fetchAndSaveNews;
