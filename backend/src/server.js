import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import instructorRoutes from './routes/instructor.js';
import { initializeDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

initializeDatabase();
const ALLOWED_ORIGINS = [
  CLIENT_ORIGIN,
  'https://artbat-backend.onrender.com', // Self
  'https://vercel.com',
  /\.vercel\.app$/, // Allow all Vercel previews
  'http://localhost:5173',
  'http://localhost:5174',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.some(o => (typeof o === 'string' ? o === origin : o.test(origin)))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'LSSM backend is running',
    docs: '/api',
    health: '/health',
  });
});

app.get('/api', (_req, res) => {
  res.json({
    message: 'LSSM API index',
    endpoints: [
      'GET /health',
      'POST /api/auth/login',
      'POST /api/auth/register',
      'POST /api/auth/logout',
      'GET /api/auth/me',
      'GET /api/courses',
      'GET /api/courses/:id',
      'POST /api/courses/:id/enroll',
      'GET /api/student/my-courses',
      'GET /api/student/courses/:courseId/progress',
      'POST /api/student/courses/:courseId/lessons/:lessonId/complete',
      'GET /api/courses/:courseId/reviews',
      'POST /api/courses/:courseId/reviews',
      'GET /api/instructor/courses',
      'POST /api/instructor/courses',
      'PUT /api/instructor/courses/:id',
      'DELETE /api/instructor/courses/:id',
    ],
  });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'lssm-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/instructor', instructorRoutes);
app.use('/api', courseRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${PORT}`);
});
