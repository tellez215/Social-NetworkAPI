const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        Required: true,
        validate: [({ length }) => length > 0 && length <= 280, 'Can only be between 1 and 280 characters long!']
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],

}, {
    toJSON: {
        getters: true,
        virtuals: true
    }
});


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;