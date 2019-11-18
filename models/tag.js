const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    created_by: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Tag', tagSchema)
