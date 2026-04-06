import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  createEnrollment,
  getCourses,
  getCourseById,
  getEnrollmentsByUser,
  getEnrollmentByUserCourse,
  completeLesson,
  getReviewsByCourse,
  createReview,
} from '../db.js';

const router = Router();

router.get('/courses', (req, res) => {
  const { category, level, search, language } = req.query;
  const filters = {
    category: category ? String(category) : undefined,
    level: level ? String(level) : undefined,
    search: search ? String(search) : undefined,
    language: language ? String(language) : undefined,
  };

  const result = getCourses(filters);
  res.json(result);
});

router.get('/courses/:id', (req, res) => {
  const course = getCourseById(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  return res.json(course);
});

router.post('/courses/:id/enroll', requireAuth, (req, res) => {
  const enrollment = createEnrollment(req.user.id, req.params.id);
  if (!enrollment) return res.status(404).json({ message: 'Course not found' });
  return res.status(201).json(enrollment);
});

router.get('/student/my-courses', requireAuth, (req, res) => {
  const enrollments = getEnrollmentsByUser(req.user.id);
  res.json(enrollments);
});

router.get('/student/courses/:courseId/progress', requireAuth, (req, res) => {
  const enrollment = getEnrollmentByUserCourse(req.user.id, req.params.courseId);
  if (!enrollment) return res.status(404).json({ message: 'Progress not found' });
  return res.json(enrollment);
});

router.post('/student/courses/:courseId/lessons/:lessonId/complete', requireAuth, (req, res) => {
  const enrollment = completeLesson(req.user.id, req.params.courseId, req.params.lessonId);
  if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
  return res.status(204).send();
});

router.get('/courses/:courseId/reviews', (req, res) => {
  const reviews = getReviewsByCourse(req.params.courseId);
  res.json(reviews);
});

router.post('/courses/:courseId/reviews', requireAuth, (req, res) => {
  const { rating, comment } = req.body || {};
  if (typeof rating !== 'number' || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }

  const review = createReview(req.user.id, req.params.courseId, rating, String(comment));
  if (!review) return res.status(404).json({ message: 'Course not found' });
  return res.status(201).json(review);
});

export default router;
