import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext.jsx"

function Aside() {
    const { user } = useAuth();
    const username = user?.username;
    
    return (
        <aside className="text-zinc-900 dark:text-white group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-[#050505]/95 px-2 py-1.5 backdrop-blur sm:absolute sm:inset-y-0 sm:max-w-[72px] sm:border-r sm:border-t-0 sm:bg-white dark:sm:bg-[#121212] sm:py-6 sm:hover:max-w-[260px] transition-all duration-300 overflow-hidden">
            <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                {/* Home */}
                <li>
                    <Link to={`/`} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            Home
                        </span>
                    </Link>
                </li>

                {/* Liked */}
                <li className="hidden sm:block">
                    <Link to={'/mychannel/liked-videos'} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 21V10M1 12V19C1 20.1046 1.89543 21 3 21H16.4262C17.907 21 19.1662 19.9197 19.3914 18.4562L20.4683 11.4562C20.7479 9.6389 19.3418 8 17.5032 8H14C13.4477 8 13 7.55228 13 7V3.46584C13 2.10399 11.896 1 10.5342 1C10.2093 1 9.91498 1.1913 9.78306 1.48812L6.26394 9.40614C6.10344 9.76727 5.74532 10 5.35013 10H3C1.89543 10 1 10.8954 1 12Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            Liked
                        </span>
                    </Link>
                </li>

                {/* History */}
                <li>
                    <Link to={'/mychannel/history-videos'} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7 11.5L18.7005 9.5L16.7 11.5M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C13.3019 1 16.1885 2.77814 17.7545 5.42909M10 5V10L13 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            History
                        </span>
                    </Link>
                </li>

                {/* Yours (Channel) */}
                <li className="hidden sm:block">
                    <Link to={`/mychannel/${username}`} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 4.93137C21 4.32555 21 4.02265 20.8802 3.88238C20.7763 3.76068 20.6203 3.69609 20.4608 3.70865C20.2769 3.72312 20.0627 3.93731 19.6343 4.36569L16 8L19.6343 11.6343C20.0627 12.0627 20.2769 12.2769 20.4608 12.2914C20.6203 12.3039 20.7763 12.2393 20.8802 12.1176C21 11.9774 21 11.6744 21 11.0686V4.93137Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H11.2C12.8802 1 13.7202 1 14.362 1.32698C14.9265 1.6146 15.3854 2.07354 15.673 2.63803C16 3.27976 16 4.11984 16 5.8V10.2C16 11.8802 16 12.7202 15.673 13.362C15.3854 13.9265 14.9265 14.3854 14.362 14.673C13.7202 15 12.8802 15 11.2 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            Yours
                        </span>
                    </Link>
                </li>

                {/* Admin */}
                <li className="hidden sm:block">
                    <Link to={'/mychannel/admin'} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 12.1853C11 12.1853 11 10.1853 13 10.1853C15 10.1853 15 12.1853 15 12.1853C15 12.1853 15 14.1853 13 14.1853C11 14.1853 11 12.1853 11 12.1853Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 16V8M3 13V11C3 9.89543 3.89543 9 5 9H17C18.1046 9 19 9.89543 19 11V13C19 14.1046 18.1046 15 17 15H5C3.89543 15 3 14.1046 3 13ZM7 11.1853V13.1853" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            Admin
                        </span>
                    </Link>
                </li>

                {/* Support */}
                <li className="hidden sm:block mt-auto pb-4">
                    <Link to={'/support'} className="flex flex-col items-center justify-center rounded-lg py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all sm:px-2 group-hover:sm:flex-row group-hover:sm:justify-start group-hover:sm:pl-6">
                        <span className="w-6 shrink-0 group-hover:sm:mr-5">
                            <svg style={{ width: "100%" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7574 7.52152 14.2127 8.06731C14.668 8.61311 14.9184 9.2977 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-[10px] sm:mt-1 shrink-0 font-medium group-hover:sm:text-sm group-hover:sm:mt-0">
                            Support
                        </span>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Aside