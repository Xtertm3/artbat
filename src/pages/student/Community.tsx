import { motion } from 'framer-motion';
import { MessageSquare, Heart, Share2, Users, Flame, Trophy, Plus, Loader2 } from 'lucide-react';
import { useCommunity } from '@/hooks/useStudentData';
import { useState } from 'react';

export default function StudentCommunityPage() {
  const { feedQuery, leaderboardQuery, postMutation, likeMutation } = useCommunity();
  const [postContent, setPostContent] = useState('');

  const feedData = feedQuery.data || { posts: [] };
  const posts = feedData.posts || [];
  const leaderboard = leaderboardQuery.data || [];
  const isLoading = feedQuery.isLoading;

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    postMutation.mutate({ content: postContent, type: 'Discussion' }, {
      onSuccess: () => {
        setPostContent('');
      }
    });
  };

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: Stats & Trends */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center text-white text-3xl font-bold mb-4">AM</div>
            <h4 className="text-xl font-bold">Your Profile</h4>
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
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your artistic mind?"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 transition"
              onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
            />
          </div>
          <button 
            disabled={postMutation.isPending || !postContent.trim()}
            onClick={handleCreatePost}
            className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center transition hover:bg-primary-200 disabled:opacity-50"
          >
            {postMutation.isPending ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-primary-500" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm font-medium">No posts in the feed yet. Be the first!</p>
            </div>
          ) : (
            posts.map((post: any) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-500">
                      {post.authorName?.slice(0, 2).toUpperCase() || '??'}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{post.authorName}</h5>
                      <p className="text-[10px] text-gray-400">{post.createdAt}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full">
                    {post.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.content}
                </p>
                {post.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                    <img src={post.mediaUrl} alt="Post media" className="w-full h-auto object-cover max-h-96" />
                  </div>
                )}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-50 dark:border-gray-800">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-500 transition"
                  >
                    <Heart size={16} className={post.isLiked ? 'fill-red-500 text-red-500' : ''} /> {post.likesCount}
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary-600 transition">
                    <MessageSquare size={16} /> {post.commentsCount}
                  </button>
                  <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white transition ml-auto">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </main>

      {/* Right Sidebar: Leaderboard & Events */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h5 className="font-bold flex items-center gap-2 mb-6">
            <Trophy size={16} className="text-yellow-500" /> Leaderboard
          </h5>
          <div className="space-y-4">
            {leaderboardQuery.isLoading ? (
              [1,2,3].map(i => <div key={i} className="h-10 w-full bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse" />)
            ) : leaderboard.length === 0 ? (
              <p className="text-[10px] text-gray-400 text-center py-4">Ranking will appear soon.</p>
            ) : (
              leaderboard.map((user: any, idx: number) => (
                <div key={user.id} className="flex items-center gap-3">
                  <span className={`w-6 text-xs font-black ${idx === 0 ? 'text-yellow-500' : 'text-gray-400'}`}>0{idx + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                    {user.name?.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">{user.name}</p>
                    <p className="text-[10px] text-gray-400">{user.xp || 0} XP</p>
                  </div>
                </div>
              ))
            )}
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
