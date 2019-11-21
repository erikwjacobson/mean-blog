const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const PostMiddleware = require('../middleware/posts');

// Get all posts
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

// Get a specific post
router.get('/:id', PostMiddleware.getPost, (req,res) => {
    res.json(res.post)
})

// Create a post
router.post('/', async (req,res) => {
    // Create a new post
    var post = new Post();
    const user = req.body.user

    // Fill fields
    for(var attr in attributes) {
        if(req.body[attr] != null) { // Fill all of the fields submitted
            res.post[attr] = req.body[attr]
        }
    }
    
    // Associate with user
    post.created_by = user.id
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})

// Update a post
router.patch('/:id', PostMiddleware.getPost, async (req,res) => {
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

// Delete a post
router.delete('/:id', PostMiddleware.getPost, async (req,res) => {
    try {
        await res.post.remove()
        res.json({ message: 'Successfully removed this post.'})
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;