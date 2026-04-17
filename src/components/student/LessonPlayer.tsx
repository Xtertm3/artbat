import { PlayCircle, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface LessonPlayerProps {
  videoUrl?: string;
  title?: string;
  onEnded?: () => void;
}

export function LessonPlayer({ videoUrl, title, onEnded }: LessonPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
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
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <Loader2 size={40} className="text-primary-500 animate-spin mx-auto mb-3" />
            <p className="text-sm text-white/60 font-medium">Preparing your lesson...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 p-8 text-center">
          <div>
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Video Unavailable</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              This video might be restricted or restricted for embedding. Please contact support or try another lesson.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            onReady={() => setIsLoading(false)}
            onEnded={onEnded}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            config={{
              youtube: {
                playerVars: { showinfo: 0, rel: 0, modestbranding: 1 }
              }
            }}
          />
        </div>
      )}

      {/* Decorative Overlays */}
      {!hasError && !isLoading && (
        <div className="absolute top-4 left-4 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
          Live Academic Stream
        </div>
      )}
    </div>
  );
}
