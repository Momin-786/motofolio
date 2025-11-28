# Setup Instructions

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up MongoDB Atlas

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster (M0)
3. Create database user (Database Access)
4. Whitelist IP (Network Access - allow 0.0.0.0/0 for development)
5. Get connection string (Database → Connect → Connect your application)

### 3. Configure Environment Variables

Create `.env.local` file in project root:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=motofolio
NEXT_PUBLIC_API_URL=/api
```

### 4. Run Development Server
```bash
npm run dev
```

## What's Been Implemented

✅ **Database Integration**
- MongoDB connection setup
- API routes for Projects, Skills, About, Contact
- Ready for data migration

✅ **Animation Improvements**
- Framer Motion installed
- GPU-accelerated animations
- Optimized window transitions
- Smooth 60fps animations

✅ **Ubuntu/Kali Theme**
- Minimal window decorations
- Ubuntu dark theme colors
- Clean, professional design
- Nautilus-style components ready

## Next Steps

1. **Set up MongoDB Atlas** (see DATABASE_SETUP.md)
2. **Migrate data** from components to database
3. **Update apps** to use Ubuntu theme
4. **Test API routes** and SSR

## API Endpoints

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- `GET /api/skills?category=programming` - Get skills
- `GET /api/about` - Get about sections
- `POST /api/contact` - Submit contact form

## Testing

Test API routes:
```bash
# Get projects
curl http://localhost:3000/api/projects

# Get skills
curl http://localhost:3000/api/skills
```






