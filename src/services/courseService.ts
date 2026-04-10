import api from '@/lib/axios';
import type { Course, CourseFilters, Enrollment, Review } from '@/types';

export const courseService = {
  getCourses: async (filters?: CourseFilters): Promise<{ courses: Course[]; total: number }> => {
    const res = await api.get('/courses', { params: filters });
    return res.data;
  },

  getCourse: async (id: string): Promise<Course> => {
    const res = await api.get(`/courses/${id}`);
    return res.data;
  },

  getMyCourses: async (): Promise<Enrollment[]> => {
    const res = await api.get('/student/my-courses');
    return res.data;
  },

  enrollCourse: async (courseId: string): Promise<Enrollment> => {
    const res = await api.post(`/courses/${courseId}/enroll`);
    return res.data;
  },

  getProgress: async (courseId: string): Promise<Enrollment> => {
    const res = await api.get(`/student/courses/${courseId}/progress`);
    return res.data;
  },

  markLessonComplete: async (courseId: string, lessonId: string): Promise<void> => {
    await api.post(`/student/courses/${courseId}/lessons/${lessonId}/complete`);
  },

  getReviews: async (courseId: string): Promise<Review[]> => {
    const res = await api.get(`/courses/${courseId}/reviews`);
    return res.data;
  },

  submitReview: async (courseId: string, data: { rating: number; comment: string }): Promise<Review> => {
    const res = await api.post(`/courses/${courseId}/reviews`, data);
    return res.data;
  },

  // Instructor
  createCourse: async (data: Partial<Course>): Promise<Course> => {
    const res = await api.post('/instructor/courses', data);
    return res.data;
  },

  updateCourse: async (id: string, data: Partial<Course>): Promise<Course> => {
    const res = await api.put(`/instructor/courses/${id}`, data);
    return res.data;
  },

  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/instructor/courses/${id}`);
  },

  getInstructorCourses: async (): Promise<Course[]> => {
    const res = await api.get('/instructor/courses');
    return res.data;
  },
};
