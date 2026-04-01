const iconClasses =
  'inline-flex rounded-full p-2 mb-3';

const FullPageState = ({
  variant = 'info', // 'loading' | 'error' | 'empty' | 'info'
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const isLoading = variant === 'loading';
  const isError = variant === 'error';

  return (
    <div className="flex h-full items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-sm text-center">
        <p className="mb-3 w-full">
          {isLoading ? (
            <span className={`${iconClasses}`}>
              <span className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600 dark:border-blue-500" />
            </span>
          ) : (
            <span
              className={`${iconClasses} ${
                isError
                  ? 'bg-red-100 text-red-600'
                  : 'bg-zinc-100 dark:bg-zinc-900/40 text-blue-600 dark:text-blue-500'
              }`}
            >
              {isError ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              ) : (
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
              )}
            </span>
          )}
        </p>
        {title && <h5 className="mb-2 text-base font-semibold">{title}</h5>}
        {message && (
          <p className="mb-4 text-sm text-gray-400">
            {message}
          </p>
        )}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center rounded bg-blue-600 dark:bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9c67ff]"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FullPageState;

