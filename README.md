# youtube-clone 🎥

**A Full-Stack YouTube-Inspired Video Sharing Platform**

🚀 **Live Demo:** [https://youtube-frontend-git-main-siyakavad54-6810s-projects.vercel.app/](https://youtube-frontend-git-main-siyakavad54-6810s-projects.vercel.app/)

This is a modern, feature-rich multimedia platform that brings the core functionality of YouTube to life with a clean, responsive interface and robust backend architecture. Built with the MERN stack, it offers seamless video streaming, user engagement features, and comprehensive content management.

## ✨ Key Features

### 🎬 Video Management
- **Upload & Stream** - High-quality video hosting with Cloudinary integration
- **Advanced Metadata** - Thumbnails, descriptions, duration tracking, and view analytics
- **Publishing Controls** - Draft and publish system for content creators

### 👥 User Experience
- **Authentication System** - Secure JWT-based login with refresh tokens
- **User Profiles** - Customizable avatars, cover images, and channel management
- **Watch History** - Persistent viewing history across sessions

### 🚀 Social Features
- **Engagement System** - Like/dislike functionality across videos and tweets
- **Comments** - Threaded commenting system for community interaction
- **Subscriptions** - Follow your favorite creators and get updates
- **Playlists** - Organize and curate video collections

### 📱 Modern Frontend
- **Responsive Design** - Tailwind CSS for mobile-first, beautiful interfaces
- **State Management** - Redux Toolkit for efficient data flow
- **Real-time Updates** - Hot toast notifications and loading states
- **Interactive Components** - Custom video players and engagement widgets

### 📊 Creator Tools
- **Dashboard Analytics** - View statistics and engagement metrics
- **Content Management** - Easy video upload, edit, and organization
- **Community Features** - Twitter-like posts and audience interaction

## 🛠️ Tech Stack

**Frontend:**
- React 19 with Vite
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT authentication with bcrypt
- Cloudinary for media storage
- Multer for file uploads

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account


## 📁 Project Structure

```
Axoryn/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── middlewares/      # Auth & validation
│   │   └── utils/            # Helper functions
│   └── public/               # Static files
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── services/        # API integration
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets
└── package.json             # Root package configuration
```

## 🎯 Core API Endpoints

- **Authentication**: `/api/v1/users` - Registration, login, profile management
- **Videos**: `/api/v1/videos` - Upload, stream, metadata management
- **Social**: `/api/v1/comments`, `/api/v1/likes` - User interactions
- **Content**: `/api/v1/playlists`, `/api/v1/tweets` - Content organization
- **Analytics**: `/api/v1/dashboard` - Creator insights

## 🌟 What Makes  Special

- **Production-Ready Architecture** - Scalable backend with proper error handling
- **Modern UI/UX** - Intuitive design inspired by the best video platforms
- **Comprehensive Features** - Not just video sharing, but a complete social platform
- **Developer-Friendly** - Clean code structure with clear separation of concerns
- **Cloud-Integrated** - Leverages Cloudinary for optimal media delivery


---

*Built with ❤️ as part of the Chai and Code - Hitesh Chaudhary Sir learning journey*