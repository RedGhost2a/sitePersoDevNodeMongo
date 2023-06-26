const express = require('express');
const UserController = require('../_controllers/UserController');
const router = express.Router();
const authenticateJWT = require('../_middleware/authenticateJWT');

router.post('/new', UserController.createUser);
router.post('/login', UserController.loginUser);

// Utilisez le middleware d'authentification avant les routes qui nécessitent une authentification
router.get('/:id',  UserController.getUser);
router.get('/', UserController.getAllUser);
router.put('/:id', authenticateJWT, UserController.updateUser);
router.delete('/:id', authenticateJWT, UserController.deleteUser);

module.exports = router;
