import { Activity, CheckCircle2, Clock3, CreditCard, MessageSquare, ShieldCheck, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/store/authStore';

const QUICK_ACTIONS = [
  {
    title: 'Review New Instructors',
    description: '8 profiles waiting for verification',
    icon: <ShieldCheck size={18} />,
  },
  {
    title: 'Moderate Course Content',
    description: '12 courses flagged for quality review',
    icon: <Activity size={18} />,
  },
  {
    title: 'Reconcile Payments',
    description: 'Process today\'s payout summary',
    icon: <CreditCard size={18} />,
  },
  {
    title: 'Support Inbox',
    description: '23 unresolved learner tickets',
    icon: <MessageSquare size={18} />,
  },
];

const RECENT_ACTIVITY = [
  { id: 1, text: 'Instructor verification approved: Ravi Kannan', time: '12 min ago' },
  { id: 2, text: 'Course published: Advanced Tabla Rhythms', time: '28 min ago' },
  { id: 3, text: 'Refund request processed for order #LSSM-9021', time: '1 hr ago' },
  { id: 4, text: 'Content report resolved: Dance Basics Batch 3', time: '2 hr ago' },
  { id: 5, text: 'New partnership request received from Pune center', time: '3 hr ago' },
];

const SYSTEM_HEALTH = [
  { name: 'API Latency', value: '142ms', status: 'Good' },
  { name: 'Video Streaming', value: '99.93%', status: 'Stable' },
  { name: 'Payment Gateway', value: 'Operational', status: 'Healthy' },
  { name: 'Support SLA', value: '1h 12m', status: 'Within target' },
];

function Metric({ label, value, icon }: { label: string; value: string; icon: ReactNode }) {
  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <div className="text-primary-600 dark:text-primary-400">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </article>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-800 text-white">
        <p className="text-sm text-white/80 mb-2">Control Center</p>
        <h1 className="text-3xl font-bold mb-2">
          {user?.name ? `${user.name.split(' ')[0]}'s Admin Operations Center` : 'Admin Operations Center'}
        </h1>
        <p className="text-white/90">Monitor platform growth, quality, payments, and operational health in one place.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Metric label="Total Users" value="28,340" icon={<Users size={18} />} />
        <Metric label="Active Instructors" value="312" icon={<ShieldCheck size={18} />} />
        <Metric label="Monthly Payments" value="₹18.4L" icon={<CreditCard size={18} />} />
        <Metric label="Live Incidents" value="3" icon={<Activity size={18} />} />
      </section>

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((item) => (
            <article key={item.title} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:border-primary-400 transition-colors">
              <div className="w-9 h-9 rounded-lg gradient-bg text-white flex items-center justify-center mb-3">{item.icon}</div>
              <p className="font-semibold mb-1">{item.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((activity) => (
              <article key={activity.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={15} />
                  </div>
                  <p className="text-sm font-medium truncate">{activity.text}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{activity.time}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h2 className="text-xl font-bold mb-4">System Health</h2>
          <div className="space-y-3">
            {SYSTEM_HEALTH.map((item) => (
              <article key={item.name} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock3 size={14} />
                  <span>{item.value}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
