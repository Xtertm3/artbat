import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Users, Flame, Trophy, Plus } from 'lucide-react';

export default function StudentCommunityPage() {
  const posts = [
    {
      id: 'p-1',
      author: 'Sameer K.',
      avatarTxt: 'SK',
      content: 'Just finished my first week of Tabla Foundations! The rhythmic patterns are so meditative. Highly recommend Pandit Rajan Misra\'s class.',
      time: '2 hours ago',
      likes: 24,
      comments: 5,
      type: 'Discussion'
    },
    {
      id: 'p-2',
      author: 'Ananya R.',
      avatarTxt: 'AR',
      content: 'Sharing a snippet of my recent Bharatanatyam practice. Working on hand gestures today!',
      time: '5 hours ago',
      likes: 42,
      comments: 12,
      type: 'Artist Showcase',
      hasMedia: true
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: Stats & Trends */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold mb-4">AM</div>
            <h4 className="text-xl font-bold">Arjun Mehta</h4>
            <p className="text-xs text-gray-500 mb-6">Music Student • Level 12</p>
            <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-50 dark:border-gray-800">
              <div>
                <p className="text-lg font-black">1.2k</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Reputation</p>
              </div>
              <div>
                <p className="text-lg font-black">42</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h5 className="font-bold flex items-center gap-2 mb-4">
            <Flame size={16} className="text-orange-500" /> Trending Topics
          </h5>
          <div className="space-y-3">
            {['#TablaBeginner', '#ClassicalVibes', '#KathakRhythm', '#SongWriting'].map((tag) => (
              <a key={tag} href="#" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 transition">
                {tag}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="lg:col-span-6 space-y-6">
        {/* Create Post */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex gap-4">
          <div className="w-12 h-12 rounded-xl gradient-bg shrink-0" />
          <div className="flex-1">
            <input 
              placeholder="What's on your artistic mind?"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 transition"
            />
          </div>
          <button className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center transition hover:bg-primary-200">
            <Plus size={20} />
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-500">
                    {post.avatarTxt}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">{post.author}</h5>
                    <p className="text-[10px] text-gray-400">{post.time}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                  {post.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.content}
              </p>
              {post.hasMedia && (
                <div className="aspect-video rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-700">
                  <span className="text-xs text-gray-400 font-bold">Showcase Video Placeholder</span>
                </div>
              )}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-50 dark:border-gray-800">
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 transition">
                  <Heart size={16} /> {post.likes}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-600 transition">
                  <MessageSquare size={16} /> {post.comments}
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition ml-auto">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Right Sidebar: Leaderboard & Events */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h5 className="font-bold flex items-center gap-2 mb-6">
            <Trophy size={16} className="text-yellow-500" /> Leaderboard
          </h5>
          <div className="space-y-4">
            {[
              { name: 'Karthik V.', rank: 1, xp: '4.2k' },
              { name: 'Sonal M.', rank: 2, xp: '3.9k' },
              { name: 'Rahul D.', rank: 3, xp: '3.5k' }
            ].map((user) => (
              <div key={user.rank} className="flex items-center gap-3">
                <span className={`w-6 text-xs font-black ${user.rank === 1 ? 'text-yellow-500' : 'text-gray-400'}`}>0{user.rank}</span>
                <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-bold">{user.name}</p>
                  <p className="text-[10px] text-gray-400">{user.xp} XP</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            View Ranking
          </button>
        </div>
        
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h5 className="font-bold flex items-center gap-2 mb-4">
            <Users size={16} className="text-blue-500" /> Live Rooms
          </h5>
          <p className="text-[10px] text-gray-400 mb-4 font-bold uppercase">3 ROOMS ACTIVE NOW</p>
          <div className="space-y-2">
            {['Sitar Jam Session', 'VOCAL RIYAZ CLASS'].map((room) => (
              <div key={room} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-[11px] font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition cursor-pointer">
                {room}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
