/**
 * MENTORSHIP SERVICE
 */
import api from '@/lib/axios';

export const mentorshipService = {
  getUpcomingSessions: async () => {
    const res = await api.get('/student/mentorship/sessions');
    return res.data;
  },
  bookSession: async (data: { courseId: string; date: string; message?: string }) => {
    const res = await api.post('/student/mentorship/book', data);
    return res.data;
  },
  getInstructors: async () => {
    const res = await api.get('/student/mentors');
    return res.data;
  }
};

/**
 * PROGRESS SERVICE
 */
export const progressService = {
  getStats: async () => {
    const res = await api.get('/student/progress/stats');
    return res.data;
  },
  getActivity: async (range: 'weekly' | 'monthly' = 'weekly') => {
    const res = await api.get('/student/progress/activity', { params: { range } });
    return res.data;
  },
  getSkills: async () => {
    const res = await api.get('/student/progress/skills');
    return res.data;
  }
};

/**
 * CERTIFICATE SERVICE
 */
export const certificateService = {
  getCertificates: async () => {
    const res = await api.get('/student/certificates');
    return res.data;
  },
  getDownloadUrl: async (id: string) => {
    const res = await api.get(`/student/certificates/${id}/download`);
    return res.data; // Expected { url: string }
  }
};

/**
 * COMMUNITY SERVICE
 */
export const communityService = {
  getFeed: async (page = 1) => {
    const res = await api.get('/community/feed', { params: { page } });
    return res.data;
  },
  createPost: async (data: { content: string; type: string; mediaUrl?: string }) => {
    const res = await api.post('/community/posts', data);
    return res.data;
  },
  likePost: async (id: string) => {
    const res = await api.post(`/community/posts/${id}/like`);
    return res.data;
  },
  getLeaderboard: async () => {
    const res = await api.get('/community/leaderboard');
    return res.data;
  }
};

/**
 * USER SERVICE (Profile & Settings)
 */
export const userService = {
  getProfile: async () => {
    const res = await api.get('/student/profile');
    return res.data;
  },
  updateProfile: async (data: any) => {
    const res = await api.put('/student/profile', data);
    return res.data;
  },
  updateSettings: async (data: any) => {
    const res = await api.put('/student/settings', data);
    return res.data;
  },
  changePassword: async (data: any) => {
    const res = await api.post('/student/change-password', data);
    return res.data;
  }
};
