const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';  // Assurez-vous d'utiliser la même clé secrète que celle utilisée pour signer les tokens

function authenticateJWT(req, res, next) {
    // Obtenez le token de l'en-tête 'Authorization'
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Le token JWT est souvent envoyé dans l'en-tête 'Authorization' sous le format 'Bearer [token]'
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                // Si une erreur se produit pendant la vérification, renvoyez une réponse indiquant que l'authentification a échoué
                return res.sendStatus(403);
            }

            // Si le token est vérifié avec succès, ajoutez l'utilisateur à l'objet req et appelez next() pour passer au prochain middleware ou au gestionnaire de route
            req.user = user;
            next();
        });
    } else {
        // Si aucun token n'est fourni dans l'en-tête 'Authorization', renvoyez une réponse indiquant que l'authentification est requise
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;
