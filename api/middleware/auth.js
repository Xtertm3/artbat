import jwt from 'jsonwebtoken';
import { getUserById } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'lssm-demo-secret';

export async function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization token required' });
    return null;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(decoded.sub);
    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return null;
    }
    return user;
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return null;
  }
}