import { Link, useParams } from 'react-router-dom'
import { useGetVideoByIdQuery } from '../../services/video/videoApi'
import { Aside, CommentsCard, SavePlaylist, VideoCard } from '../../components';
import { formatViews } from '../../utils/formatViews';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { useToggleVideoLikeMutation } from '../../services/like/likeApi';
import { useToggleSubscriptionMutation } from '../../services/subscription/subscriptionApi';
import toast from 'react-hot-toast';
import FullPageState from '../../components/FullPageState.jsx';

function Player() {

  const { videoId } = useParams();
  const { data, error, isLoading, refetch } = useGetVideoByIdQuery(videoId);
  const video = data?.data?.[0];

  const [toggleVideoLike, { isLoading: isLiking }] = useToggleVideoLikeMutation();
  const [toggleSubscription] = useToggleSubscriptionMutation();

  const handleLike = async () => {
    try {
      await toggleVideoLike(videoId).unwrap();
      refetch();
    } catch (error) {
      toast.error(`Failed to toggle like! ${error?.message || ""}`);
    }
  };

  const handleSubscribe = async () => {
    try {
      await toggleSubscription(video.channel?._id).unwrap();
      refetch();
    } catch (error) {
      toast.error("You can't subscribe your own channel");
      console.error(error)
    }
  };

  return (
    <>
      <div>
        <video preload="auto" controls className='hidden'>
          <source src={video?.videoFile} type="video/mp4" />
        </video>
      </div>
      <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            {isLoading && (
              <FullPageState
                variant="loading"
                title="Loading video..."
                message="Please wait while we load the video for you."
              />
            )}

            {error && !isLoading && (
              <FullPageState
                variant="error"
                title="You have to Login"
                message={error?.data?.message || error?.message || 'Failed to load video'}
                actionLabel="Try Again"
                onAction={() => window.location.reload()}
              />
            )}

            {!isLoading && !error && video && (
              <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                <div className="col-span-12 w-full">
                  <div className="relative mb-4 w-full overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 pt-[56.25%] shadow-lg transition-colors">
                    <div className="absolute inset-0">
                      <video
                        className="h-full w-full rounded-xl object-contain"
                        controls
                        autoPlay
                        muted
                        preload="auto"
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture >
                        <source src={video?.videoFile} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h1 className="text-xl font-bold line-clamp-2">{video?.title}</h1>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <Link to={`/channel/${video.channel.username}`} className="h-10 w-10 shrink-0">
                          <img
                            src={video.channel?.avatar}
                            alt="channel avatar"
                            className="h-full w-full rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link to={`/channel/${video.channel.username}`} className="font-bold text-zinc-900 dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300">
                            {video.channel.fullName}
                          </Link>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {video.channel.subscribersCount ? video.channel.subscribersCount : 0} Subscribers
                          </p>
                        </div>
                        <button 
                          onClick={handleSubscribe} 
                          className={`ml-2 flex items-center gap-x-2 px-4 py-2 rounded-full font-bold transition-all duration-150 active:scale-95 ${
                            video.channel?.isSubscribed 
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" 
                            : "bg-zinc-900 dark:bg-white text-white dark:text-black"
                          }`}
                        >
                          {video.channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                      </div>

                      <div className="flex items-center gap-x-2">
                        <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                          <button onClick={handleLike}
                            disabled={isLiking}
                            className="flex items-center gap-x-2 px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-l-full border-r border-zinc-300 dark:border-zinc-700 transition-colors"
                          >
                            <span className="w-5">
                              {isLiking ? (
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isLiking ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                              )}
                            </span>
                            <span className="font-medium">{video?.likesCount || 0}</span>
                          </button>
                          <button className="px-4 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-r-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 rotate-180 scale-x-[-1]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                          </button>
                        </div>
                        <div className="relative">
                          <button className="flex items-center gap-x-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                            </svg>
                            Save
                          </button>
                          <SavePlaylist videoId={videoId} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-3 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700/80 cursor-default">
                    <div className="flex flex-wrap gap-x-2 text-sm font-bold mb-1">
                      <span>{formatViews(video.views)} views</span>
                      <span>{formatTimeAgo(video.createdAt)}</span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {video?.description}
                    </p>
                  </div>

                  <CommentsCard videoId={videoId} />
                </div>
                <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                  <h2 className="px-4 font-bold text-lg hidden lg:block border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2">Up Next</h2>
                  <div className="flex flex-col">
                    <VideoCard userSpecificVideos={false} horizontal={true} />
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>

  )
}

export default Player