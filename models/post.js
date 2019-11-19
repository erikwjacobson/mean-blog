const mongoose = require('mongoose');

/**
 * Posts Schema
 */
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'New Blog Post'
    },
    body: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false
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
    tags: [mongoose.Schema.Types.ObjectId], // TODO Determine if this should be done by reference or nesting.
    categories: [mongoose.Schema.Types.ObjectId], // TODO Determine if this should be done by reference or nesting.
    created_by: mongoose.Schema.Types.ObjectId,
    meta: {
        views: Number
    },
});

// Statics
/**
 * Returns all of the paths that are fillable through front-end requests
 */
postSchema.statics.fillable = function() {
    // Define excluded attributes
    var { _id, __v, created_at, updated_at, ...attrs } = this.schema.paths
    return attrs;
}

module.exports = mongoose.model('Post', postSchema);