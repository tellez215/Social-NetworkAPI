const router = require('express').Router();

const {
    getUsers,
    getUserByID,
    addUser,
    updateUser,
    deleteUser,
    // addFriend,
    // deleteFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(addUser)

router.route('/:id')
    .get(getUserByID)
    .put(updateUser)
    .delete(deleteUser);

// router.route('/:id/friends/:friendID')
//     .post(addFriend)
//     .delete(deleteFriend)


module.exports = router;