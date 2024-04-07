//import models.. "if you export with curly braces you import with curly braces"
const { User, Friends, Thoughts } = require('../models')

module.exports = {

    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

};