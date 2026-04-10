import { getReviewsByCourse, createReview, initializeDatabase } from '../../db.js';
import { requireAuth } from '../../middleware/auth.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await initializeDatabase();

    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Course ID required' });
    }

    if (req.method === 'GET') {
      const reviews = await getReviewsByCourse(id);
      res.status(200).json(reviews);
    } else if (req.method === 'POST') {
      const user = await requireAuth(req, res);
      if (!user) return;

      const { rating, comment } = req.body || {};
      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }

      const review = await createReview(id, user.id, rating, comment || '');
      res.status(201).json(review);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Reviews error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}