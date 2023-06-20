const express = require('express');
const articleController = require('../_controllers/articleController');

const router = express.Router();

router.get('/', articleController.getAllArticles);
router.post('/', articleController.createArticle);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

module.exports = router;
