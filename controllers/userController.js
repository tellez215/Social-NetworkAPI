const { User } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    getUserByID(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('thoughts')
            .populate('friends')
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err.message));
    },

    addUser(req, res) {
        User.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true, new: true })
            .then((users) =>
                !users ?
                res.status(404).json({ message: 'No user with this id!' }) :
                res.json(users)
            )
            .catch((err) => res.status(500).json(err));
    },

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


    // deleteFriend
}

module.exports = userController;