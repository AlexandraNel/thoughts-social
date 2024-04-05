//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../controllers')

// /api/user
router.route('/').get(getAllUsers).post(createUser)

// /api/user/:userId
router
.route('/:userId')
.get(getOneUser)
.put( updateUser)
.delete( deleteUser);

module.exports = router;