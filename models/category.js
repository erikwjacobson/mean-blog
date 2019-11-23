const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Category', categorySchema)
module.exports.schema = categorySchema
