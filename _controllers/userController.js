const UserService = require('../_service/userService');

const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
}

const getUser = async (req, res) => {
    const user = await UserService.getUser(req.params.id);
    return res.status(200).json(user);
}

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
    const token = await UserService.loginUser(req.body.username, req.body.password);

    if (!token) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    return res.status(200).json({ token: token });
}

module.exports={
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser

}