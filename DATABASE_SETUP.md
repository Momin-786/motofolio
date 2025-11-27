# Database Setup Guide

## MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create a Cluster**
   - Choose free tier (M0)
   - Select your preferred region
   - Wait for cluster to be created (~5 minutes)

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your server IP only

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `motofolio` (or your preferred name)



6. **Set Environment Variables**
   - Create `.env.local` file in project root
   - Add:
     ```
     MONGODB_URI=your_connection_string_here
     MONGODB_DB=motofolio
     ```

## Initial Data Migration

After setting up the database, you'll need to migrate existing data:

1. **Projects**: Copy data from `components/apps/projects.js`
2. **Skills**: Copy data from `components/apps/skills.js`
3. **About**: Copy data from `components/apps/about.js`

You can use MongoDB Compass or create a migration script to insert initial data.

## Testing API Routes

Once database is set up, test the API routes:

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get all skills
curl http://localhost:3000/api/skills

# Get about sections
curl http://localhost:3000/api/about

# Post a contact message
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```





