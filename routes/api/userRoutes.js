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

// /api/user
router.route('/').get(getAllUsers).post(createUser)

// /api/user/:userId
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