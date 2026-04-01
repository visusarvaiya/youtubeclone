import { useGetChannelStatsQuery } from '../../services/dashboard/dashboardApi';
import {
    useDeleteVideoMutation,
    usePublishAVideoMutation,
    useTogglePublishStatusMutation,
    useUpdateVideoMutation,
} from '../../services/video/videoApi';
import { Aside } from '../../components';
import { useState } from 'react';
import toast from 'react-hot-toast';

function Admin() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [editingVideoId, setEditingVideoId] = useState(null);
    const [deletingVideoId, setDeletingVideoId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
    });

    const { data: statsDetails, refetch, isLoading: statsLoading } = useGetChannelStatsQuery();

    const [deleteVideo] = useDeleteVideoMutation();
    const [updateVideo] = useUpdateVideoMutation();
    const [togglePublishStatus, { isLoading: toggleLoading }] = useTogglePublishStatusMutation();
    const [publishAVideo] = usePublishAVideoMutation();

    const stats = statsDetails?.data?.[0];

    const handleDelete = async (id) => {
        try {
            await deleteVideo(id).unwrap();
            toast.success("Video deleted forever.");
            setDeletingVideoId(null);
            refetch();
        } catch (e) {
            toast.error(`Failed to delete the video! ${e?.message || ""}`);
        }
    };

    const handleToggle = async (video) => {
        try {
            await togglePublishStatus(video._id).unwrap();
            refetch();
        } catch (err) {
            toast.error(`Failed to toggle publish status! ${err?.message || ""}`);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmitUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in form) {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        }
        try {
            await publishAVideo(formData);
            toast.success('Video uploaded successfully!');
            setIsUploadOpen(false);
            setForm({ title: "", description: "", videoFile: null, thumbnail: null });
            refetch();
        } catch (err) {
            toast.error(`Failed to upload the video! ${err?.message || ""}`);
        }
    };

    const handleSubmitEdit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in form) {
            if (form[key]) {
                formData.append(key, form[key]);
            }
        }
        try {
            await updateVideo({ formData, videoId: id }).unwrap();
            toast.success("Video edited successfully!");
            setEditingVideoId(null);
            setForm({ title: "", description: "", videoFile: null, thumbnail: null });
            refetch();
        } catch (err) {
            toast.error(`Failed to edit the video! ${err?.message || ""}`);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-zinc-900 dark:text-white">
            <div className="flex">
                <Aside />
                <main className="flex-1 sm:ml-[72px] pb-[70px] sm:pb-0">
                    <div className="max-w-7xl mx-auto p-4 sm:p-8">
                        {/* Header Section */}
                        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Channel Content</h1>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your videos and view channel performance.</p>
                            </div>
                            <button 
                                onClick={() => setIsUploadOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Upload Video
                            </button>
                        </header>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            {[
                                { label: "Total Views", value: stats?.totalViews || "0", icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )},
                                { label: "Subscribers", value: stats?.totalSubscribers || "0", icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                )},
                                { label: "Video Likes", value: stats?.totalLikes || "0", icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                )}
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-sm font-bold text-zinc-500 dark:text-zinc-400">{item.label}</h3>
                                    </div>
                                    <p className="text-3xl font-bold">{statsLoading ? "—" : item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Video List Table */}
                        <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Video</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-center">Status</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-center">Visibility</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                        {stats?.videosDetails?.length > 0 ? (
                                            stats.videosDetails.map((video) => (
                                                <tr key={video._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                                                                <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className="font-semibold text-sm line-clamp-1">{video.title}</h4>
                                                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">{video.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                                            video.isPublished 
                                                                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-800" 
                                                                : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800"
                                                        }`}>
                                                            {video.isPublished ? "Published" : "Draft"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-center">
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="sr-only peer" 
                                                                    checked={video.isPublished}
                                                                    onChange={() => handleToggle(video)}
                                                                    disabled={toggleLoading}
                                                                />
                                                                <div className="w-11 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">
                                                        {new Date(video.createdAt).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button 
                                                                onClick={() => {
                                                                    setEditingVideoId(video._id);
                                                                    setForm({
                                                                        title: video.title || "",
                                                                        description: video.description || "",
                                                                        videoFile: null,
                                                                        thumbnail: null
                                                                    });
                                                                }}
                                                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                                </svg>
                                                            </button>
                                                            <button 
                                                                onClick={() => setDeletingVideoId(video._id)}
                                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-20 text-center">
                                                    <p className="text-zinc-500">No videos found. Start by uploading one!</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modals & Overlays */}
            {/* Upload Modal */}
            {isUploadOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setIsUploadOpen(false)} />
                    <form onSubmit={handleSubmitUpload} className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-bold">Upload Video</h2>
                            <button type="button" onClick={() => setIsUploadOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 text-center hover:border-blue-500 transition-colors cursor-pointer group">
                                <label className="cursor-pointer block">
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                    </div>
                                    <span className="font-bold text-sm">Select video file</span>
                                    <p className="text-xs text-zinc-500 mt-1">{form.videoFile ? form.videoFile.name : "Limit 100MB"}</p>
                                    <input type="file" name="videoFile" accept="video/*" onChange={handleChange} className="hidden" />
                                </label>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Title</label>
                                    <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Video Title" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Description</label>
                                    <textarea name="description" value={form.description} onChange={handleChange} className="w-full h-32 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="What's this video about?" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Thumbnail</label>
                                        <div className="relative aspect-video rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex items-center justify-center cursor-pointer">
                                            {form.thumbnail ? <img src={URL.createObjectURL(form.thumbnail)} className="w-full h-full object-cover" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-zinc-400 font-bold"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>}
                                            <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsUploadOpen(false)} className="px-6 py-2.5 text-sm font-bold rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">Cancel</button>
                            <button type="submit" className="px-10 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700">Save</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Modal (Simpler version for now, logic similar to upload) */}
            {editingVideoId && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm" onClick={() => setEditingVideoId(null)} />
                    <form onSubmit={(e) => handleSubmitEdit(e, editingVideoId)} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                            <h2 className="text-xl font-bold">Edit Video Details</h2>
                            <button type="button" onClick={() => setEditingVideoId(null)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Title</label>
                                <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Description</label>
                                <textarea name="description" value={form.description} onChange={handleChange} className="w-full h-32 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                            </div>
                        </div>
                        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
                            <button type="button" onClick={() => setEditingVideoId(null)} className="px-6 py-2.5 text-sm font-bold rounded-full border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800">Cancel</button>
                            <button type="submit" className="px-10 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700">Update Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Confirm Delete Dialog */}
            {deletingVideoId && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-red-900/20 backdrop-blur-sm" onClick={() => setDeletingVideoId(null)} />
                    <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl text-center border border-red-200 dark:border-red-900/30">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Delete Video?</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">This action is permanent and cannot be undone. Are you sure you want to delete this video?</p>
                        <div className="flex flex-col gap-3">
                            <button onClick={() => handleDelete(deletingVideoId)} className="w-full py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all">Yes, Delete Forever</button>
                            <button onClick={() => setDeletingVideoId(null)} className="w-full py-3 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;