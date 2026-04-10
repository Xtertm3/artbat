# Deployment Guide

## Frontend (Vercel)

The frontend is now consolidated to the root directory for seamless integration with Vercel.

### Recommended Vercel Settings:
- **Framework Preset**: Vite (Auto-detected)
- **Root Directory**: `./` (Project Root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Environment Variables:
You MUST set the following Environment Variable in Vercel:
- `VITE_API_URL`: The URL of your backend on Render (e.g., `https://artbat-backend.onrender.com/api`)
- `VITE_SOCKET_URL`: The base URL of your backend (e.g., `https://artbat-backend.onrender.com`)

## Backend (Render)

The backend is located in the `backend/` directory.

### Recommended Render Settings:
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Root Directory**: `backend` (if Render allows subdirectory root) or set the build/start commands manually as above.
