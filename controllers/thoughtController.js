// const res = require("express/lib/response");
const { Thought, User } = require("../models");

const thoughtController = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err.message));
    },

    getThoughtByID(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err.message));
    },

    addThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { thoughts: thoughts._id } }, { new: true });
            })
            .then((thoughts) =>
                !thoughts ?
                res.status(404).json({
                    message: ' no thought with that ID',
                }) :
                res.json('Thought Added!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err.message);
            });
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { runValidators: true, new: true })
            .then((thoughts) =>
                !thoughts ?
                res.status(404).json({ message: 'No thought with this id!' }) :
                res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err.message);
            });
    },

    updateThoughtReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
            .then((thoughts) =>
                !thoughts ?
                res.status(404).json({ message: 'No thought with this id!' }) :
                res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err.message);
            });
    },
    deleteThoughtReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true })
            .then((thoughts) =>
                !thoughts ?
                res.status(404).json({ message: 'No thought with this id!' }) :
                res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err.message);
            });
    }

}
module.exports = thoughtController;