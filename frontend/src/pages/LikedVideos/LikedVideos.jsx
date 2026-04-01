import { Link } from 'react-router-dom';
import { Aside, VideoCard } from '../../components'
import { useGetLikedVideosQuery } from '../../services/like/likeApi';
import { formatDuration } from '../../utils/formatDuration';
import { formatViews } from '../../utils/formatViews';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

function LikedVideos() {
  const { data, error, isLoading } = useGetLikedVideosQuery();
  const videos = data?.data || [];

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0f0f0f] text-zinc-900 dark:text-white">
      <Aside />
      <main className="flex-1 sm:ml-[72px] pb-[70px] sm:pb-0">
        <div className="p-4 sm:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Liked Videos</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">{videos.length} videos</p>
          </header>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-3" />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
              <p className="text-zinc-500 mb-6">{error?.data?.message || "Failed to load your liked videos."}</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Try Again
              </button>
            </div>
          )}

          {/* Videos Grid */}
          {!isLoading && !error && (
            <>
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                  {videos.map((video) => {
                    const videoDetails = video.videoDetails || video; // Fallback if structure varies
                    const channel = (video.channel && video.channel[0]) || videoDetails.channel || {};
                    
                    return (
                      <div key={videoDetails._id} className="group cursor-pointer">
                        <Link to={`/player/${videoDetails._id}`} className="block relative aspect-video overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                          <img
                            src={videoDetails.thumbnail}
                            alt={videoDetails.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-xs font-medium rounded">
                            {formatDuration(videoDetails.duration)}
                          </span>
                        </Link>
                        
                        <div className="flex gap-3 mt-3 px-1">
                          <Link to={`/channel/${channel.username}`} className="w-9 h-9 shrink-0">
                            <img
                              src={channel.avatar}
                              alt={channel.username}
                              className="w-full h-full rounded-full object-cover hover:opacity-80 transition-opacity"
                            />
                          </Link>
                          <div className="flex-1 overflow-hidden">
                            <Link to={`/player/${videoDetails._id}`}>
                              <h3 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {videoDetails.title}
                              </h3>
                            </Link>
                            <Link to={`/channel/${channel.username}`} className="block text-zinc-500 dark:text-zinc-400 text-xs mt-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors">
                              {channel.fullName || channel.username}
                            </Link>
                            <div className="text-zinc-500 dark:text-zinc-400 text-xs mt-0.5 flex items-center gap-1">
                              <span>{formatViews(videoDetails.views)} views</span>
                              <span>•</span>
                              <span>{formatTimeAgo(videoDetails.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">No liked videos</h2>
                  <p className="text-zinc-500">Videos you like will appear here.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default LikedVideos