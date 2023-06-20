const Contact = require('../_models/contact');

const findAll = async () => {
    return Contact.find();
};

const create = async (contactData) => {
    const newContact = new Contact(contactData);
    return newContact.save();
};



const deleteById = async (id) => {
    return Contact.findByIdAndRemove(id);
};

module.exports = {
    findAll,
    create,
    deleteById
};
