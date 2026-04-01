## Axoryn – Quick Start

This guide shows the fastest way to run Axoryn locally on Windows.

---

## 1. Requirements

- **Node.js**: v18+ (LTS recommended)
- **MongoDB**: Local server or MongoDB Atlas account
- **Cloudinary** (optional but recommended): Account for media uploads

---

## 2. Clone & Open Project

```bash
git clone https://github.com/Yash2204V/Axoryn.git
cd Axoryn
```

Or, if you already have the folder:

```bash
cd "D:\student\vs code\y1\Axoryn-main"
```

---

## 3. Environment Variables

### 3.1 Backend `.env`

In the `backend` folder, create a file named `.env`:

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173

MONGODB_URI=mongodb://127.0.0.1:27017

ACCESS_TOKEN_SECRET=your-access-secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ō
```

> Replace the `ACCESS_*`, `REFRESH_*`, and `CLOUDINARY_*` values with your own secure values.

### 3.2 Frontend `.env`

In the `frontend` folder, create a file named `.env`:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_FRONTEND_URL=http://localhost:5173
```

---

## 4. Install Dependencies

From the project root:

```bash
cd "D:\student\vs code\y1\Axoryn-main"

# Root dependencies (concurrently)
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

## 5. Run the App (Development)

From the **project root**:

```bash
cd "D:\student\vs code\y1\Axoryn-main"
npm run dev
```

This will start:

- **Backend API** on `http://localhost:8000`
- **Frontend (Vite)** on `http://localhost:5173`

Open your browser at: `http://localhost:5173`

---

## 6. Common Issues

- **MongoDB connection error**  
  - Make sure MongoDB is running and `MONGODB_URI` is correct.

- **CORS errors**  
  - Ensure `CORS_ORIGIN` in `backend/.env` matches your frontend URL exactly.

- **Cloudinary upload errors**  
  - Check Cloudinary credentials and that the account is active.


