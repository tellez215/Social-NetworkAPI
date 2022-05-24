const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    addThought,
    updateThought,
    updateThoughtReaction,
    deleteThoughtReaction,
    // deleteThought,
} = require('../../controllers/thoughtController');


router.route('/')
    .get(getThoughts)


router.route('/:userId')
    .post(addThought)


router.route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThought)
    // .delete(deleteThought)

router.route('/reactions/:thoughtId')
    .post(updateThoughtReaction)

router.route('/reactions/:thoughtId/:reactionId')
    .delete(deleteThoughtReaction)


module.exports = router;