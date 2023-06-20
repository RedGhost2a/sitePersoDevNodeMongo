const express = require('express');
const contactController = require('../_controllers/contactController');

const router = express.Router();
// const contactController = new ContactController();


router.get('/messageList', contactController.getAllContatc);
router.post('/', contactController.createContact);
router.delete('/:id', contactController.deleteContact);
module.exports = router;

