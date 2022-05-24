const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    addThought,
    updateThought,
    updateThoughtReaction,
    deleteThoughtReaction,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts/
router.route('/')
    .get(getThoughts)


// api/thoughts/:userId
router.route('/:userId')
    .post(addThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought)


// /api/thoughts/:thoughtId/reactions
router.route('/reactions/:thoughtId')
    .post(updateThoughtReaction)


// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/reactions/:thoughtId/:reactionId')
    .delete(deleteThoughtReaction)


module.exports = router;