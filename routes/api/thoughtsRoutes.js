//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllThoughts,
    createThoughts,
    getOneThought,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction

} = require('../../controllers')

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThoughts)

// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getOneThought)
.put( updateThoughts)
.delete( deleteThoughts);

// /api/thoughts/:thoughtsId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)

// /api/thoughts/:thoughtsId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;