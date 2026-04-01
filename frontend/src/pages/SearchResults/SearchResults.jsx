import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Aside from '../../components/Aside/Aside.jsx';
import httpClient from '../../services/httpClient.js';
import { formatDuration } from '../../utils/formatDuration.js';
import { formatViews } from '../../utils/formatViews.js';
import { formatTimeAgo } from '../../utils/formatTimeAgo.js';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    let ignore = false;
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await httpClient.get('/videos', {
          params: {
            query,
            page: 1,
            limit: 24,
          },
        });
        if (ignore) return;
        const docs = res.data?.data?.docs ?? res.data?.data ?? [];
        setResults(docs);
      } catch (err) {
        if (ignore) return;
        setError(err?.response?.data?.message || err.message || 'Failed to fetch search results');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchResults();
    return () => {
      ignore = true;
    };
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white">
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Aside />
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="px-4 pt-4">
            <h1 className="text-lg font-semibold">
              {hasQuery ? `Results for "${query}"` : 'Search'}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Discover videos across the platform.
            </p>
          </div>

          {loading && (
            <div className="flex h-full items-center justify-center p-8">
              <div className="w-full max-w-sm text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-500" />
                <h5 className="mb-2 font-semibold">Searching videos...</h5>
                <p>Please wait while we fetch matching content.</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="flex h-full items-center justify-center p-8">
              <div className="w-full max-w-sm text-center">
                <p className="mb-3 w-full">
                  <span className="inline-flex rounded-full bg-red-100 p-2 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </span>
                </p>
                <h5 className="mb-2 font-semibold">Something went wrong</h5>
                <p className="mb-4">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && hasQuery && results.length === 0 && (
            <div className="flex h-full items-center justify-center p-8">
              <div className="w-full max-w-sm text-center">
                <p className="mb-3 w-full">
                  <span className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-900/40 p-2 text-blue-600 dark:text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-6 w-6"
                    >
                      <circle cx="11" cy="11" r="6" />
                      <line x1="16" y1="16" x2="21" y2="21" />
                    </svg>
                  </span>
                </p>
                <h5 className="mb-2 font-semibold">No results</h5>
                <p className="mb-4">
                  We couldn't find any videos matching this search. Try another term.
                </p>
              </div>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
              {results.map((video) => (
                <div key={video._id} className="w-full">
                  {video.isPublished && (
                    <div className="w-full">
                      <div className="relative mb-2 w-full overflow-hidden rounded-xl bg-black/20 pt-[56%] shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                        <Link to={`/player/${video._id}`}>
                          <div className="absolute inset-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </Link>
                        <span className="absolute bottom-1 right-1 inline-block rounded bg-black/80 px-1.5 text-xs">
                          {formatDuration(video.duration)}
                        </span>
                      </div>
                      <div className="flex gap-x-2">
                        <Link
                          to={`/channel/${video.channel?.username}`}
                          className="h-10 w-10 shrink-0"
                        >
                          <img
                            src={video.channel?.avatar}
                            alt={video.channel?.username}
                            loading="lazy"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </Link>
                        <div className="w-full capitalize">
                          <h6 className="mb-1 line-clamp-2 font-semibold">
                            {video.title}
                          </h6>
                          <p className="flex text-sm text-gray-400">
                            {formatViews(video.views)}&nbsp;Views · {formatTimeAgo(video.createdAt)}
                          </p>
                          <p className="text-sm lowercase text-gray-400">
                            @{video.channel?.username}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchResults;

