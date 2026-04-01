import { useState } from 'react';
import Aside from '../../components/Aside/Aside.jsx';
import httpClient from '../../services/httpClient.js';
import toast from 'react-hot-toast';

const UploadVideo = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoFile: null,
    thumbnail: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.videoFile || !form.title || !form.description) {
      toast.error('Please fill all required fields and select a video.');
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      setIsSubmitting(true);
      await httpClient.post('/videos', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Video uploaded successfully!');
      setForm({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Video upload failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-zinc-900 dark:text-white">
      <div className="flex">
        <Aside />
        <main className="flex-1 sm:ml-[72px] pb-[70px] sm:pb-0">
          <div className="max-w-4xl mx-auto p-4 sm:p-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2">
                Share your content with the community. Videos stay private until you publish them.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              {/* Drag n Drop Area */}
              <div className="group relative w-full border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl px-6 py-12 transition-all duration-300 bg-white dark:bg-zinc-900/50">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Drag and drop video files to upload</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
                    Your videos will be private until you publish them. Limit 100MB.
                  </p>

                  <label
                    htmlFor="videoFile"
                    className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm cursor-pointer hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                  >
                    <input
                      type="file"
                      id="videoFile"
                      name="videoFile"
                      accept="video/*"
                      onChange={handleChange}
                      className="sr-only"
                    />
                    Select video
                  </label>

                  {form.videoFile && (
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      {form.videoFile.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6 md:col-span-1">
                  <div>
                    <label htmlFor="title" className="block text-sm font-bold mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Add a descriptive title"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-bold mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full h-40 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                      placeholder="Tell viewers about your video"
                    />
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="thumbnail" className="block text-sm font-bold mb-2">
                    Thumbnail
                  </label>
                  <div className="relative group aspect-video rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex flex-col items-center justify-center p-4 overflow-hidden">
                    {form.thumbnail ? (
                      <img 
                        src={URL.createObjectURL(form.thumbnail)} 
                        alt="Preview" 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-zinc-400 mb-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        <p className="text-xs text-zinc-500 text-center px-4">Click to upload or drag image</p>
                      </>
                    )}
                    <input
                      id="thumbnail"
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setForm({ title: '', description: '', videoFile: null, thumbnail: null })}
                  className="px-6 py-2.5 text-sm font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-2.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload Video'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadVideo;

