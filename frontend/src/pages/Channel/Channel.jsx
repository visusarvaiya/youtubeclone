import { useState } from 'react'
import { Aside, PlaylistCard, SubscribedCard, VideoCard } from '../../components'
import { useGetUserChannelProfileQuery } from '../../services/user/userApi';
import { useParams } from 'react-router-dom';
import { useToggleSubscriptionMutation } from '../../services/subscription/subscriptionApi';
import TweetCard from '../../components/TweetCard';
import toast from 'react-hot-toast';

function Channel() {
  const { username } = useParams();
  const [switchState, setSwitchState] = useState('videos');
  
  const { data, refetch } = useGetUserChannelProfileQuery(username);
  const channel = data?.data;

  const [toggleSubscription] = useToggleSubscriptionMutation();

  const handleSubscribe = () => {
    toggleSubscription(channel?._id).unwrap();
    toast.success(channel?.isSubscribed ? "Unsubscribed successfully" : "Subscribed successfully");
    refetch();
  }

  return (
    <>
      <div>
          <link
            rel="preload"
            as="image"
            href={channel?.avatar}
          />
          <link
            rel="preload"
            as="image"
            href={channel?.coverImage}
          />
      </div>
      <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Aside />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
            <div className="relative w-full pt-[16.28%] bg-zinc-200 dark:bg-zinc-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={channel?.coverImage}
                  alt="cover-photo"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-[#121212] bg-[#121212]">
                  <img
                    src={channel?.avatar}
                    alt={channel?.username || "channel-avatar"}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="mr-auto inline-block">
                  <h1 className="text-2xl font-bold">{channel?.fullName}</h1>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">@{channel?.username}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {channel?.subscribersCount} Subscribers&nbsp;·&nbsp;{channel?.channelsSubscribedToCount} Subscribed
                  </p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={handleSubscribe} 
                    className={`flex items-center gap-x-2 px-4 py-2 rounded-full font-bold transition-all duration-150 active:scale-95 ${
                      channel?.isSubscribed 
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" 
                      : "bg-zinc-900 dark:bg-white text-white dark:text-black"
                    }`}
                  >
                    {!channel?.isSubscribed && (
                      <span className="w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                    )}
                    {channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </div>
              <ul className="no-scrollbar flex flex-row gap-x-2 overflow-auto border-b border-zinc-200 dark:border-zinc-800 bg-transparent py-2 sticky top-[56px] z-10">
                <li className="shrink-0">
                  <button
                    onClick={() => setSwitchState('videos')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      switchState === 'videos' 
                        ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white' 
                        : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    Videos
                  </button>
                </li>
                <li className="shrink-0">
                  <button
                    onClick={() => setSwitchState('playlists')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      switchState === 'playlists' 
                        ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white' 
                        : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    Playlists
                  </button>
                </li>
                <li className="shrink-0">
                  <button
                    onClick={() => setSwitchState('tweets')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      switchState === 'tweets' 
                        ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white' 
                        : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    Tweets
                  </button>
                </li>
                <li className="shrink-0">
                  <button
                    onClick={() => setSwitchState('subscribed')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      switchState === 'subscribed' 
                        ? 'border-zinc-900 text-zinc-900 dark:border-white dark:text-white' 
                        : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                  >
                    Subscribed
                  </button>
                </li>
              </ul>
              <div className="">
                  {/* Videos, Playlists, Tweet, Subscribed Conditional Rendering Mapping Here */}
                  { switchState === "videos" && 
                    <VideoCard data={channel?._id} /> 
                  }
                  {switchState === "tweets" &&
                    <TweetCard data={channel?._id} />
                  }
                  {switchState === "playlists" && 
                    <PlaylistCard data={channel?._id} />
                  }
                  {switchState === "subscribed" && 
                    <SubscribedCard data={channel?._id} />
                  }
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

export default Channel