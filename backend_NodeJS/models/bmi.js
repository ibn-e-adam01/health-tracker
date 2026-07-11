const mongoose = require('mongoose');

const bmiSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bmi'
    },
    bmi: Number,
    category: String,
    calculatedAt : {
        type: Date,
        default: Date.now
    },
    day: {
        type: String,
        default: new Date().toLocaleDateString('en-US', { weekday: 'long' })
    }
    
})

module.exports = mongoose.model('bmi', bmiSchema);