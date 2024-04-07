//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllThoughts,
    createThought,
    getOneThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers')

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought)

// /api/thoughts/:thoughtId
router
.route('/:thoughtId')
.get(getOneThought)
.put( updateThought)
.delete( deleteThought);

// /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(createReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);


module.exports = router;