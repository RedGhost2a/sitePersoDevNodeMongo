const User = require('../_models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';  // Vous devriez le stocker en dehors du code, par exemple dans des variables d'environnement

const createUser = async (userData) => {
    // Hachage du mot de passe avant de l'enregistrer
    userData.password = await bcrypt.hash(userData.password, saltRounds);
    const newUser = new User(userData);
    return await newUser.save();
}

const getUser = async (id) => {
    return User.findById(id);
}

const updateUser = async (id, userData) => {
    if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    return User.findByIdAndUpdate(id, userData, {new: true});
}

const deleteUser = async (id) => {
    return User.findByIdAndDelete(id);
}

const loginUser = async (username, password) => {
    // Recherchez l'utilisateur dans la base de données
    const user = await User.findOne({ username: username });

    // Si l'utilisateur n'existe pas ou que le mot de passe est incorrect, retournez null
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }

    // Générez un JWT et retournez-le
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    return token;
}
module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser
};