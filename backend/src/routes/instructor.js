import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import {
  createCourse,
  deleteCourse,
  getInstructorCourses,
  getCourseById,
  updateCourse,
} from '../db.js';

const router = Router();

router.use(requireAuth);
router.use(requireRole(['instructor', 'admin']));

router.get('/courses', (req, res) => {
  const courses = getInstructorCourses(req.user.id, req.user.role);
  res.json(courses);
});

router.post('/courses', (req, res) => {
  const course = createCourse(req.body, {
    id: req.user.id,
    name: req.user.name,
    rating: req.user.rating || 0,
  });
  res.status(201).json(course);
});

router.put('/courses/:id', (req, res) => {
  const course = updateCourse(req.params.id, req.body, req.user);
  if (!course) {
    return res.status(404).json({ message: 'Course not found or unauthorized' });
  }
  res.json(course);
});

router.delete('/courses/:id', (req, res) => {
  const deleted = deleteCourse(req.params.id, req.user);
  if (!deleted) {
    return res.status(404).json({ message: 'Course not found or unauthorized' });
  }
  res.status(204).send();
});

export default router;
