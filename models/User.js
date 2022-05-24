const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
    username: {
        type: String,
        Unique: true,
        Required: true,
        trimmed: true
    },

    email: {
        type: String,
        Required: true,
        Unique: true,
        Match: [/.+@.+\..+/, 'Enter a valid e-mail address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]


}, {
    toJSON: {
        getters: true,
        virtuals: true
    }
});


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;