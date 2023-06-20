const express = require('express');
const UserController = require('../_controllers/UserController');
const router = express.Router();
const authenticateJWT = require('../_middleware/authenticateJWT');

router.post('/users', UserController.createUser);
router.post('/login', UserController.loginUser);

// Utilisez le middleware d'authentification avant les routes qui nécessitent une authentification
router.get('/users/:id', authenticateJWT, UserController.getUser);
router.put('/users/:id', authenticateJWT, UserController.updateUser);
router.delete('/users/:id', authenticateJWT, UserController.deleteUser);

module.exports = router;
