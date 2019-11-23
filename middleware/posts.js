const Post = require('../models/post');

// Check for 


// Get Post function
async function getPost(req, res, next) {
    try {
        post = await Post.findById(req.params.id)
        if(post == null) {
            return res.status(404).json({ message: 'Can\'t find post.' })
        }
    } catch(err) {
        return res.status(500).json({ message:err.message })
    }

    res.post = post
    next()
}

/**
 * Ensure the authenticated user has permission to complete an action
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function authorize(req, res, next) {
    try {
        var post = res.post
        // If post is not created by current user, and user is not admin, return unauthorized
        if(post.created_by != req.body.user._id && !req.body.user.permissions.admin) {
            res.status(401).json({ message: 'The user logged in is not authorized to complete this action.'})
        }
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

    next()
}

module.exports.getPost = getPost
module.exports.authorize = authorize