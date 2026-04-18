import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

// GET all posts/discussions with author details
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET posts by specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST create new post/discussion
router.post('/', async (req, res) => {
  try {
    const { title, content, type = 'discussion' } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // For now, we'll use a mock user ID. In a real app, this would come from authentication middleware
    const mockUserId = '507f1f77bcf86cd799439011'; // This would be req.user.id
    
    const post = new Post({
      author: mockUserId,
      title,
      content,
      type
    });
    
    const savedPost = await post.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate('author', 'username fullName profilePicture');
    
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT like/unlike post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    const likeIndex = post.likes.indexOf(mockUserId);
    
    if (likeIndex === -1) {
      post.likes.push(mockUserId);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT repost/unrepost post
router.put('/:id/repost', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    const repostIndex = post.reposts.indexOf(mockUserId);
    
    if (repostIndex === -1) {
      post.reposts.push(mockUserId);
    } else {
      post.reposts.splice(repostIndex, 1);
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST comment on post
router.post('/:id/comment', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    post.comments.push({
      author: mockUserId,
      content,
      createdAt: new Date()
    });
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT save/unsave post
router.put('/:id/save', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    const saveIndex = post.saves.indexOf(mockUserId);
    
    if (saveIndex === -1) {
      post.saves.push(mockUserId);
    } else {
      post.saves.splice(saveIndex, 1);
    }
    
    await post.save();
    
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('reposts', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await Post.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
