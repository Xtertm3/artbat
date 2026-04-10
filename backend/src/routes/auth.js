import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../db.js';
import { requireAuth } from '../middleware/auth.js';
import { verifyPassword } from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'lssm-demo-secret';
const JWT_EXPIRES_IN = '8h';

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userRecord = getUserByEmail(String(email).toLowerCase(), true);
    if (!userRecord || !verifyPassword(password, userRecord.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ sub: userRecord.id, role: userRecord.role, email: userRecord.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      token,
      user: {
        id: userRecord.id,
        name: userRecord.name,
        email: userRecord.email,
        role: userRecord.role,
        avatar: userRecord.avatar || '',
        isVerified: Boolean(userRecord.isVerified),
        createdAt: userRecord.createdAt,
      },
    });
  } catch (error) {
    console.error('[AUTH ERROR] Login crash:', error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
});


router.post('/register', (req, res) => {
  const { name, email, password, role = 'student' } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existing = getUserByEmail(String(email).toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'Email is already registered' });
  }

  createUser({ name, email: String(email).toLowerCase(), password, role });
  return res.status(201).json({ message: 'Registration successful' });
});

router.post('/logout', requireAuth, (_req, res) => {
  return res.status(204).send();
});

router.get('/me', requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    avatar: req.user.avatar || '',
    isVerified: req.user.isVerified,
    createdAt: req.user.createdAt,
  });
});

router.post('/forgot-password', (_req, res) => {
  res.json({ message: 'Reset link sent (mock).' });
});

router.post('/reset-password', (_req, res) => {
  res.json({ message: 'Password reset successful (mock).' });
});

router.post('/verify-email', (_req, res) => {
  res.json({ message: 'Email verified (mock).' });
});

export default router;
