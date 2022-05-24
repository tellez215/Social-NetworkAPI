const req = require('express/lib/request');
const { User } = require('../models');


const userController = {
    // get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get user by id
    getUserByID(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err.message));
    },

    // create a user
    addUser(req, res) {
        User.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },

    // update user
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
            .then((users) =>
                !users ?
                res.status(404).json({ message: 'No user with this id!' }) :
                res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndRemove({ _id: params.id }, { runValidators: true, new: true })
            .then(users => {
                if (!users) {
                    res.status(500).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json({ message: 'User Deleted!' })
            })
    },

    // addFriend

    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $addToSet: { friends: params.friendId } }, { runValidators: true, new: true })
            .then((users) => {
                if (!users) {
                    res.status(404).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(users);
            })
            .catch(err => res.status(400).json(err.message));
    },


    // deleteFriend

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
            .then((users) =>
                !users ?
                res.status(404).json({ message: 'No friend with this id!' }) :
                res.json(users)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err.message);
            });
    }
}

module.exports = userController;