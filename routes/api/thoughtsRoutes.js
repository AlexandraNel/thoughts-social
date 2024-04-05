//router instance
const router = require('express').Router();

//.js route functions
const { 
    getAllThoughts,
    createThoughts,
    getOneThought,
    updateThoughts,
    deleteThoughts,
} = require('../../controllers')

// /api/Thoughts
router.route('/').get(getAllThoughts).post(createThoughts)

// /api/Thoughts/:ThoughtsId
router
.route('/:ThoughtsId')
.get(getOneThought)
.put( updateThoughts)
.delete( deleteThoughts);

module.exports = router;