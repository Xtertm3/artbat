import { getCourses, initializeDatabase } from '../db.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    await initializeDatabase();

    const { category, level, search, language } = req.query;
    const filters = {
      category: category ? String(category) : undefined,
      level: level ? String(level) : undefined,
      search: search ? String(search) : undefined,
      language: language ? String(language) : undefined,
    };

    const courses = await getCourses(filters);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Courses error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}