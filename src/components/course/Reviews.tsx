import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { getInitials, timeAgo } from '@/lib/utils';
import type { Review } from '@/types';
import { cn } from '@/lib/utils';

interface ReviewsProps {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

function RatingBar({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-2 text-right text-gray-500">{stars}</span>
      <Star size={12} className="text-amber-400 fill-amber-400" />
      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
      <span className="w-8 text-xs text-gray-400">{percentage}%</span>
    </div>
  );
}

export function Reviews({ reviews, rating, totalReviews }: ReviewsProps) {
  const [helpful, setHelpful] = useState<Set<string>>(new Set());

  // Mock breakdown
  const breakdown = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    percentage: s === 5 ? 70 : s === 4 ? 20 : s === 3 ? 5 : s === 2 ? 3 : 2,
  }));

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div className="text-center">
          <p className="text-6xl font-bold text-amber-500">{rating.toFixed(1)}</p>
          <div className="flex justify-center gap-0.5 my-2">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={16} className={cn(s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300')} />
            ))}
          </div>
          <p className="text-sm text-gray-500">{totalReviews.toLocaleString()} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {breakdown.map((b) => <RatingBar key={b.stars} {...b} />)}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-5">
        {reviews.length === 0 && (
          <p className="text-center text-gray-500 py-8">No reviews yet. Be the first!</p>
        )}
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-gray-100 dark:border-gray-800 pb-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shrink-0">
                {r.user.avatar ? <img src={r.user.avatar} className="w-full h-full object-cover rounded-full" alt="" /> : getInitials(r.user.name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{r.user.name}</p>
                  <span className="text-xs text-gray-400">{timeAgo(r.createdAt)}</span>
                </div>
                <div className="flex gap-0.5 my-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={12} className={cn(s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300')} />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{r.comment}</p>
                <button
                  onClick={() => {
                    const s = new Set(helpful);
                    if (s.has(r.id)) {
                      s.delete(r.id);
                    } else {
                      s.add(r.id);
                    }
                    setHelpful(s);
                  }}
                  className={cn('flex items-center gap-1.5 text-xs mt-2 hover:text-primary-600 transition',
                    helpful.has(r.id) ? 'text-primary-600' : 'text-gray-400')}
                >
                  <ThumbsUp size={13} />
                  Helpful ({r.helpful + (helpful.has(r.id) ? 1 : 0)})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
