const articleService = require('../_service/articleService');

const getAllArticles = async (req, res) => {
    const articles = await articleService.findAll();
    res.send(articles);
};

const createArticle = async (req, res) => {
    const newArticle = await articleService.create(req.body);
    res.send(newArticle);
};

const updateArticle = async (req, res) => {
    const updatedArticle = await articleService.update(req.params.id, req.body);
    res.send(updatedArticle);
};

const deleteArticle = async (req, res) => {
    await articleService.deleteById(req.params.id);
    res.status(204).send(); // 204 means "No Content", which is appropriate since we're deleting
};

module.exports = {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle
};
