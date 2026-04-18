import express from 'express';
import Article from '../models/Article.js';
import User from '../models/User.js';

const router = express.Router();

// GET all articles with author details
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture')
      .sort({ createdAt: -1 });
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST create new article
router.post('/', async (req, res) => {
  try {
    const { title, content, coverImage } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // For now, we'll use a real user ID from the test user we just created
    const realUserId = '69e323cbe7442468c84ee5ad';
    
    const article = new Article({
      author: realUserId,
      title,
      content,
      coverImage: coverImage || ''
    });
    
    const savedArticle = await article.save();
    const populatedArticle = await Article.findById(savedArticle._id)
      .populate('author', 'username fullName profilePicture');
    
    res.status(201).json(populatedArticle);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Search articles by title, content, or author name
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const searchRegex = new RegExp(query, 'i');
    
    const articles = await Article.find({
      $or: [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } }
      ]
    })
    .populate('author', 'username fullName profilePicture')
    .populate('likes', 'username fullName profilePicture')
    .populate('comments.author', 'username fullName profilePicture')
    .sort({ createdAt: -1 });
    
    // Also search by author full name
    const users = await User.find({
      $or: [
        { fullName: { $regex: searchRegex } },
        { username: { $regex: searchRegex } }
      ]
    });
    
    if (users.length > 0) {
      const userIds = users.map(user => user._id);
      const articlesByAuthor = await Article.find({
        author: { $in: userIds }
      })
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture')
      .sort({ createdAt: -1 });
      
      // Combine and remove duplicates
      const allArticles = [...articles, ...articlesByAuthor];
      const uniqueArticles = allArticles.filter((article, index, self) =>
        index === self.findIndex((a) => a._id.toString() === article._id.toString())
      );
      
      return res.json(uniqueArticles);
    }
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT like/unlike article
router.put('/:id/like', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    const likeIndex = article.likes.indexOf(mockUserId);
    
    if (likeIndex === -1) {
      article.likes.push(mockUserId);
    } else {
      article.likes.splice(likeIndex, 1);
    }
    
    await article.save();
    
    const updatedArticle = await Article.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST comment on article
router.post('/:id/comment', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // For now, we'll use a mock user ID
    const mockUserId = '507f1f77bcf86cd799439011';
    
    article.comments.push({
      author: mockUserId,
      content,
      createdAt: new Date()
    });
    
    await article.save();
    
    const updatedArticle = await Article.findById(req.params.id)
      .populate('author', 'username fullName profilePicture')
      .populate('likes', 'username fullName profilePicture')
      .populate('comments.author', 'username fullName profilePicture');
    
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
