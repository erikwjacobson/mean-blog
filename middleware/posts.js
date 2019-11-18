const Post = require('../models/post');

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

module.exports.getPost = getPost