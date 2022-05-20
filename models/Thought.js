const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        Required: true,
        validate: [({ length }) => length > 0 && length <= 280, 'Can only be between 1 and 280 characters long!']
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
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


UserSchema.virtual('reactionCount').get(function() {
    return this.friends.length;
})

const User = model('Thought', ThoughtSchema);

module.exports = Thought;