import { memo, useState } from 'react'
import { useAddCommentMutation, useDeleteCommentMutation, useGetVideoCommentsQuery } from '../services/comment/commentApi';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import Button from './Button';
import toast from 'react-hot-toast';
import { useGetCurrentUserQuery } from '../services/user/userApi';
import { Link } from 'react-router-dom';

const CommentsCard = memo(({ videoId }) => {

    const token = localStorage.getItem('token');
    const userData = useGetCurrentUserQuery(undefined, { skip: !token })?.data?.data;
    const user = userData;
    const userId = userData?._id;
    
    const { data: commentsData, refetch } = useGetVideoCommentsQuery(videoId);
    const comments = commentsData?.data?.docs || [];
    

    const [addingComment, setAddingComment] = useState("");
    const [addComment] = useAddCommentMutation();
    const [deletePlaylist] = useDeleteCommentMutation();
    // const [updatePlaylist] = useUpdateCommentMutation();


    const handleAddComment = async () => {
        try {
            await addComment({
                videoId,
                body: { content: addingComment }
            }).unwrap();
            setAddingComment("");

            toast.success("Comment added!");
            refetch();
        } catch (err) {
            toast.error(`Failed to add comment! ${err?.message || ""}`);
        }
    };

    const handleDelete = async (commentId) => {
        
        try {
            await deletePlaylist(commentId).unwrap();
            toast.success("Comment deleted!");
            refetch();
        } catch (err) {
            toast.error(`Failed to delete comment! ${err?.message || ""}`);
        }
    }

    return (
        <>
        <div className="mt-6">
            <h6 className="mb-4 text-xl font-bold">{comments?.length} Comments</h6>
            
            <div className="flex gap-4 mb-8">
                <div className="h-10 w-10 shrink-0">
                    <img
                        src={user?.avatar || "https://res.cloudinary.com/dt9v7tc0x/image/upload/v1715420138/samples/people/smiling-man.jpg"}
                        alt="current user"
                        className="h-full w-full rounded-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full border-b border-zinc-300 dark:border-zinc-700 bg-transparent py-1.5 focus:border-zinc-900 dark:focus:border-white outline-none transition-colors"
                        placeholder="Add a comment..."
                        value={addingComment}
                        onChange={(e) => setAddingComment(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end gap-3">
                        {addingComment && (
                            <button 
                                onClick={() => setAddingComment("")}
                                className="px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                        <button 
                            disabled={!addingComment.trim()}
                            onClick={handleAddComment}
                            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                                addingComment.trim() 
                                ? "bg-blue-600 text-white hover:bg-blue-700" 
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            }`}
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {comments && comments.length > 0 ? (
                    comments.map((comment, idx) => (
                        <div key={comment._id || idx} className="flex gap-4 group">
                            <Link to={`/channel/${comment?.commentor.username}`} className="h-10 w-10 shrink-0">
                                <img
                                    src={comment?.commentor.avatar}
                                    alt={comment?.commentor.username}
                                    className="h-full w-full rounded-full object-cover" 
                                />
                            </Link>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Link to={`/channel/${comment?.commentor.username}`} className="text-sm font-bold hover:text-zinc-700 dark:hover:text-zinc-300 truncate">
                                        @{comment?.commentor.username}
                                    </Link>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {formatTimeAgo(comment?.createdAt)}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap break-words">
                                    {comment.content}
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    {/* Action icons could go here like Like/Dislike */}
                                    {comment?.commentor._id === userId && (
                                        <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <button 
                                                onClick={() => handleDelete(comment?._id)}
                                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-red-500 transition-all"
                                                title="Delete comment"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-center">
                        <p className="text-zinc-500">No comments yet. Be the first to share your thoughts!</p>
                    </div>
                )}
            </div>
        </div>
        </>
    )
})

export default CommentsCard