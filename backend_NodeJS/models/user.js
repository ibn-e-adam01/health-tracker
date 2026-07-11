const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/healthtracker');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    bmiHistory: [
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }

    ],
    activityHistory: [
        {type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }

    ],
    joinedAt: {
        type: Date,
        default: Date.now
    },
    day: {
        type: String,
        default: new Date().toLocaleDateString('en-US', { weekday: 'long' })
    }
})

module.exports = mongoose.model('user', userSchema);