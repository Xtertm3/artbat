import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Save, Camera, Globe } from 'lucide-react';
import { useState } from 'react';

export default function StudentSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-3xl font-black">Account Settings</h1>
      </div>

      <div className="flex gap-2 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
        {[
          { id: 'profile', icon: User, label: 'Profile' },
          { id: 'notifications', icon: Bell, label: 'Notifications' },
          { id: 'security', icon: Shield, label: 'Security' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition ${
              activeTab === tab.id 
                ? 'bg-white dark:bg-gray-900 text-primary-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm"
      >
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center border-b border-gray-50 dark:border-gray-800 pb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-[2rem] gradient-bg flex items-center justify-center text-4xl font-black text-white">AM</div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-primary-600 transition hover:scale-110">
                  <Camera size={20} />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">Avatar Image</h3>
                <p className="text-sm text-gray-500 mb-4">Express yourself with a new profile photo. JPG or PNG, max 2MB.</p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <button className="px-5 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold transition hover:opacity-90">Upload New</button>
                  <button className="px-5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold transition hover:bg-gray-50 dark:hover:bg-gray-800">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Display Name</label>
                <input defaultValue="Arjun Mehta" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input defaultValue="arjun@example.com" disabled className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 text-sm opacity-60" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Bio / Artist Goals</label>
                <textarea 
                  rows={4} 
                  defaultValue="I'm a passionate music student looking to master the tabla and explore the world of rhythm."
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-primary-500 resize-none" 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
            {[
              { id: 'n1', label: 'Lesson Reminders', desc: 'Get notified when a new lesson is available.' },
              { id: 'n2', label: 'Mentorship Alerts', desc: 'Receive updates on your 1:1 sessions.' },
              { id: 'n3', label: 'Community Mentions', desc: 'Notify me when someone mentions me in a post.' },
              { id: 'n4', label: 'Platform Announcements', desc: 'News about ArtBeat features and events.' },
            ].map((n) => (
              <div key={n.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50">
                <div>
                  <p className="text-sm font-bold mb-0.5">{n.label}</p>
                  <p className="text-[10px] text-gray-500">{n.desc}</p>
                </div>
                <div className="w-12 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-8">
            <h3 className="text-xl font-bold mb-4">Security & Authentication</h3>
            <div className="space-y-6">
              <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                <h4 className="font-bold text-sm mb-4">Change Password</h4>
                <div className="space-y-4">
                  <input type="password" placeholder="Current Password" className="w-full bg-white dark:bg-gray-900 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
                  <input type="password" placeholder="New Password" className="w-full bg-white dark:bg-gray-900 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-primary-500" />
                  <button className="px-6 py-3 rounded-xl gradient-bg text-white text-xs font-bold transition hover:opacity-90">Update Password</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-6 rounded-3xl border border-red-100 dark:border-red-900/30 bg-red-50/10">
                <div>
                  <h4 className="font-bold text-sm text-red-600 mb-1">Delete Account</h4>
                  <p className="text-[10px] text-gray-500">Permanently remove your account and all data. This cannot be undone.</p>
                </div>
                <button className="px-6 py-3 rounded-xl border border-red-200 text-red-600 text-xs font-bold transition hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-50 dark:border-gray-800 flex justify-end">
          <button className="flex items-center gap-2 px-8 py-3.5 gradient-bg text-white rounded-2xl font-black text-sm shadow-lg shadow-primary-500/25 transition hover:opacity-90 active:scale-95">
            <Save size={18} /> Save All Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
