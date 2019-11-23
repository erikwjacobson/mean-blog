const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Category = require('../models/category');
const PostMiddleware = require('../middleware/posts');

/**
 * Returns all of the post resources
 */
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

/**
 * Returns a specific post resource based on id
 */
router.get('/:id', PostMiddleware.getPost, (req,res) => {
    res.json(res.post)
})

/**
 * Creates a new post resource
 * 
 * Expects Attributes:
 *  
 */
router.post('/', async (req,res) => {
    // Create a new post
    var post = new Post();

    // Fetch the user from the request
    var user = req.body.user

    // Fill fields
    var attributes = Post.fillable()
    for(var attr in attributes) { 
        if(req.body[attr] != null) { // Fill all of the fields submitted
            post[attr] = req.body[attr]
        }
    }

    // // Handle categories
    if(req.body.categories) {
        for(category in req.body.categories) {
            post.categories.push(category)
        }
    }
    
    // Handle Tags
    if(req.body.tags) {
        for(var tag in req.body.tags) {
            post.tags.push({tag_name: req.body.tags[tag]})
        }
    }
    
    
    // Associate with user
    post.created_by = user._id

    try {
        var newPost = await post.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})

/**
 * Updates a specific post resource based on id
 * 
 * Authorization Required
 * 
 */
router.patch('/:id', [PostMiddleware.getPost, PostMiddleware.authorize] , async (req,res) => {
    // Fill fields
    var attributes = Post.fillable() // Only fill fillable fields
    for(var attr in attributes) {
        if(req.body[attr] != null) { // Fill all of the fields submitted
            res.post[attr] = req.body[attr]
        }
    }
    res.post.updated_at = Date.now()
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

/**
 * Deletes a specific post resource based on id
 * 
 * Authorization Required
 * 
 */
router.delete('/:id', PostMiddleware.getPost, async (req,res) => {
    try {
        await res.post.remove()
        res.json({ message: 'Successfully removed this post.'})
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;