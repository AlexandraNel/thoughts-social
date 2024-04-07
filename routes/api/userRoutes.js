//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers')

// /api/users
router.route('/').get(getAllUsers).post(createUser)

// /api/users/:userId
router
.route('/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;