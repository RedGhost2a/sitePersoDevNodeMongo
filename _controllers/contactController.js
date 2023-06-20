const contactService = require('../_service/contactService');

const getAllContatc = async (req, res) => {
    const articles = await contactService.findAll();
    res.send(articles);
};

const createContact = async (req, res) => {
    const newArticle = await contactService.create(req.body);
    res.send(newArticle);
};



const deleteContact = async (req, res) => {
    await contactService.deleteById(req.params.id);
    res.status(204).send(); // 204 means "No Content", which is appropriate since we're deleting
};

module.exports = {
    getAllContatc,
    createContact,
    deleteContact
};
