import { Play, PlayCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LessonPlayerProps {
  videoUrl?: string;
  title?: string;
  onEnded?: () => void;
}

export function LessonPlayer({ videoUrl, title, onEnded }: LessonPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Determine if it's a YouTube URL
  const isYouTube = videoUrl?.includes('youtube.com') || videoUrl?.includes('youtu.be');
  
  // Format YouTube URL for embed if needed
  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('embed')) return url;
    
    // Simple conversion for common YT formats
    let videoId = '';
    if (url.includes('v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : url;
  };

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for better UX or actual iframe load event
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center text-center p-8 transition-all">
        <div className="max-w-xs">
          <PlayCircle size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600 animate-pulse" />
          <h3 className="text-lg font-bold text-gray-400">Select a Lesson</h3>
          <p className="text-sm text-gray-500 mt-2">
            Choose a lesson from the curriculum on the right to start learning.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl group border border-gray-200/50 dark:border-gray-800/50">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <Loader2 size={40} className="text-primary-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-white/60 font-medium">Preparing your lesson...</p>
          </div>
        </div>
      )}

      {isYouTube ? (
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title || 'Lesson Video'}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <video
          src={videoUrl}
          className="w-full h-full object-contain"
          controls
          autoPlay
          onEnded={onEnded}
          onLoadedData={() => setIsLoading(false)}
        />
      )}

      {/* Decorative Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60">
        <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
          {isYouTube ? 'Online Stream' : 'LSSM Original'}
        </div>
      </div>
    </div>
  );
}
