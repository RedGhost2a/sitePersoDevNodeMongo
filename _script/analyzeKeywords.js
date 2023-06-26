const natural = require("natural");
const stopword = require("stopword");

async function analyzeKeywords(content) {
    // Tokenisation de l'article
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(content);

    // Filtrage des mots d'arrêt
    const stopwordsEnglish = stopword.en;
    tokens = stopword.removeStopwords(tokens, stopwordsEnglish);

    // Extraction des 2-grams
    const nGrams = natural.NGrams;
    const bigrams = nGrams.bigrams(tokens);

    // Compte des bigrams
    const bigramFrequencies = new natural.TfIdf();
    bigrams.forEach(bigram => {
        bigramFrequencies.addDocument(bigram.join(' ')); // Transforme le bigram en une seule chaîne
    });

    // Récupération des 10 premiers bigrams
    const bigramKeywords = [];
    bigramFrequencies.listTerms(0 /* index du document */).slice(0, 10).forEach(item => {
        bigramKeywords.push(item.term);
    });

    // Compte des mots
    const wordFrequencies = new natural.TfIdf();
    wordFrequencies.addDocument(tokens); // Ajoute tous les tokens comme un seul document

    // Récupération des 10 premiers mots
    const keywords = [];
    wordFrequencies.listTerms(0 /* index du document */).slice(0, 10).forEach(item => {
        keywords.push(item.term);
    });

    return { keywords, bigramKeywords };
}

module.exports = analyzeKeywords;
