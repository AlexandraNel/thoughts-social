//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllFriends,
    createFriends,
    getOneFriend,
    updateFriends,
    deleteFriends,
} = require('../../controllers')

// /api/Friends
router.route('/').get(getAllFriends).post(createFriends)

// /api/Friends/:FriendsId
router
.route('/:FriendsId')
.get(getOneFriend)
.put( updateFriends)
.delete( deleteFriends);

module.exports = router;