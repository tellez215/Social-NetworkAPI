const router = require('express').Router();

const {
    getThoughts,
    getThoughtByID,
    addThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller');


router.route('/')
    .get(getThoughts)


router.route('/:userId')
    .post(addThought)


router.route('/:thoughtId')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(deleteThought)


module.exports = router;