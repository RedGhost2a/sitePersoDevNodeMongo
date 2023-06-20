const Article = require('../_models/article');

const findAll = async () => {
    return Article.find();
};

const create = async (articleData) => {
    const newArticle = new Article(articleData);
    return await newArticle.save();
};

const update = async (id, articleData) => {
    return Article.findByIdAndUpdate(id, articleData, {new: true});
};

const deleteById = async (id) => {
    return Article.findByIdAndRemove(id);
};

module.exports = {
    findAll,
    create,
    update,
    deleteById
};
