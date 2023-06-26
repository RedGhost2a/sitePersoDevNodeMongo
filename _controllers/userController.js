const UserService = require('../_service/userService');

const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
}

const getUser = async (req, res) => {
    const user = await UserService.getUser(req.params.id);
    return res.status(200).json(user);
}
const getAllUser = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
};


const updateUser = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: 'You can only update your own profile' });
    }
    const user = await UserService.updateUser(req.params.id, req.body);
    return res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    await UserService.deleteUser(req.params.id);
    return res.status(200).json({ message: "User deleted successfully" });
}

const loginUser = async (req, res) => {
    const user = await UserService.loginUser(req.body.username, req.body.password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ user });
}

module.exports={
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    getAllUser

}