import { createEnrollment, initializeDatabase } from '../../db.js';
import { requireAuth } from '../../middleware/auth.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await initializeDatabase();

    const user = await requireAuth(req, res);
    if (!user) return;

    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'Course ID required' });
    }

    const enrollment = await createEnrollment(user.id, id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}