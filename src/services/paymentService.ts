import api from '@/lib/axios';
import type { Order, Payment, PaymentVerification } from '@/types';

export const paymentService = {
  createOrder: async (courseId: string): Promise<Order> => {
    const res = await api.post('/payments/create-order', { courseId });
    return res.data;
  },

  verifyPayment: async (data: PaymentVerification): Promise<{ message: string; enrollmentId: string }> => {
    const res = await api.post('/payments/verify', data);
    return res.data;
  },

  getMyPayments: async (): Promise<Payment[]> => {
    const res = await api.get('/payments/my-payments');
    return res.data;
  },
};
