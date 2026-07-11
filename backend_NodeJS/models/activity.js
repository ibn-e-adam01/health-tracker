const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity'
    },
    activity: String,
    calculatedAt : {
        type: Date,
        default: Date.now
    },
    day: {
        type: String,
        default: new Date().toLocaleDateString('en-US', { weekday: 'long' })
    },
    activityStatus:{
        type: Boolean,
        default: false
    }
    
})

module.exports = mongoose.model('activity', activitySchema);