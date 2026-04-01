import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initial = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-2 hidden w-full max-w-2xl flex-1 items-center md:flex"
      role="search"
    >
      <div className="ml-8 flex w-full items-center overflow-hidden rounded-full border border-zinc-300 bg-white shadow-inner focus-within:border-blue-500 dark:border-zinc-700 dark:bg-[#121212] dark:focus-within:border-blue-500">
        <div className="flex-1 px-4 py-2">
          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[15px] font-normal text-zinc-900 placeholder:text-zinc-500 outline-none dark:text-zinc-100 dark:placeholder:text-zinc-400"
            aria-label="Search videos"
          />
        </div>
        <button
          type="submit"
          className="flex h-10 w-16 cursor-pointer items-center justify-center border-l border-zinc-300 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          title="Search"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-[20px] w-[20px] text-zinc-900 dark:text-zinc-200"
          >
            <circle cx="11" cy="11" r="6" />
            <line x1="16" y1="16" x2="21" y2="21" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
