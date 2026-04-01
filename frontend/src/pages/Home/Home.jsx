import { Aside, VideoCard } from '../../components'
import { useGetAllVideosQuery } from '../../services/video/videoApi';
import FullPageState from '../../components/FullPageState.jsx';

function Home() {
  const { error, isLoading } = useGetAllVideosQuery();
  
  return (
    <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[80px] pt-2 sm:ml-[70px] sm:pb-4 sm:pt-4">
          {error && !isLoading && (
            <FullPageState
              variant="error"
              title="You have to Login"
              message={error?.data?.message || error?.message || 'Failed to load videos'}
              actionLabel="Try Again"
              onAction={() => window.location.reload()}
            />
          )}

          <div className="px-3 pb-1 sm:px-4">
            <h1 className="text-base font-semibold sm:text-lg">Explore videos</h1>
            <p className="mt-1 text-xs text-gray-400 sm:text-sm">
              Watch the latest content from creators you love.
            </p>
          </div>

          <div>
            <VideoCard userSpecificVideos={false} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home