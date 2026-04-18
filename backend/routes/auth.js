import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password)
      return res.status(400).json({ message: 'Full name, username, email, and password are all required.' });

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(409).json({ message: 'Username or email already taken.' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ fullName, username, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'gnotro_secret_key', { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });

    res.status(201).json({
      message: 'Account created!',
      user: { _id: newUser._id, fullName: newUser.fullName, username: newUser.username, email: newUser.email, profilePicture: newUser.profilePicture }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Allow login with either email or username
    const user = await User.findOne({ 
      $or: [
        email ? { email } : null,
        username ? { username } : null
      ].filter(Boolean)
    });
    if (!user) return res.status(404).json({ message: 'No account found with these credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'gnotro_secret_key', { expiresIn: '7d' });

    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });

    res.json({
      message: 'Logged in!',
      user: { _id: user._id, fullName: user.fullName, username: user.username, email: user.email, profilePicture: user.profilePicture }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out.' });
});

export default router;
